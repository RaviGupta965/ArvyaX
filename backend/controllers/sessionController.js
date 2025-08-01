import Session from '../models/Session.js';

// Fetches all the session which are already Published Order By latest- This API has been checked
export const getPublicSessions = async (req, res) => {
    const sessions = await Session.find({ status: 'published' })
      .sort({ created_at: -1 })
      .populate('user_id', 'fullname');

    res.json(sessions);
  };

// Fetching all the sessions of Particular user - This API has been checked
export const getMySessions = async (req, res) => {
  const sessions = await Session.find({ user_id: req.userId }).sort({ updated_at: -1 }).populate('user_id', 'fullname');
  res.json(sessions);
};

// Fetching Details of a Session - This Route is Checked
export const getSingleSession = async (req, res) => {
  const session = await Session.findOne({ _id: req.params.id, user_id: req.userId });
  if (!session) return res.status(404).json({ message: 'Session not found' });
  res.json(session);
};

// Draft a session- This Route is Checked
export const saveDraft = async (req, res) => {
  const { _id, title, tags, json_file_url } = req.body;

  let session;
  const tagsArray = typeof tags === "string"
    ? tags.split(",").map(tag => tag.trim()).filter(Boolean)
    : Array.isArray(tags) ? tags : [];
  const data = { title, tags, json_file_url, status: 'draft', updated_at: new Date() };
  // if we found _id then updating an existing Draft else Creating session first time
  if (_id) {
    session = await Session.findOneAndUpdate(
      { _id, user_id: req.userId },
      {
        title,
        tags: tagsArray,
        json_file_url,
        status: 'draft',
        updated_at: new Date()
      },
      { new: true }
    ).populate("user_id", "username");;
  } else {
    session = await Session.create({
      title,
      tags: tagsArray,
      json_file_url,
      status: 'draft',
      user_id: req.userId
    });

    session = await session.populate("user_id", "username");

    res.json(session);
  };
}

// Publishing the session - This Route has Been checked
export const publishSession = async (req, res) => {
  const { _id } = req.body;
  if (!_id) return res.status(400).json({ message: "Session ID is required" });
  try {
    const session = await Session.findOneAndUpdate(
      { _id, user_id: req.userId },
      { status: 'published', updated_at: new Date() },
      { new: true }
    ).populate("user_id", "username");;

    if (!session) return res.status(404).json({ message: 'Session not found' });

    res.json(session);
  } catch (err) {
    console.error("Publish error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Sesion Controller -This API testing Has been Done
export const deleteSession = async (req, res) => {
  try {
    const sessionId = req.params.id;
    const session = await Session.findOne({ _id: sessionId });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    await Session.deleteOne({ _id: sessionId });
    res.json({ message: "Session deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
