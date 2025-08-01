import { useState, useEffect, useRef } from "react";
import isEqual from "lodash.isequal";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { getToken } from "../services/auth";
import { useLocation } from "react-router-dom";
import { showSuccess, showError } from "../utils/toast";
import Navbar from "../Components/Navbar";
const Createsession = () => {
  // Session Data will be stored there
  const [form, setForm] = useState({
    _id: null,
    title: "",
    tags: "",
    json_file_url: "",
    status: "draft",
  });

  const [lastSaved, setLastSaved] = useState(null);
  const [timer, setTimer] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = getToken();
  // Early Exit If user Not logged in
  if (!token) {
    navigate("/login");
  }

  const editingSession = location?.state?.session || null;
  const prevFormRef = useRef();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Autosave Handler
  const autoSave = async () => {
    try {
      if (isPublishing) return;
      const res = await API.post("/api/sessions/my-sessions/save-draft", form);

      setForm((prev) => ({ ...prev, _id: res.data._id })); // Save ID if newly created
      setLastSaved(new Date().toLocaleTimeString());
      showSuccess("Draft-saved");
      setIsDraftSaved(true);
    } catch (err) {
      showError("Draft save Error");
      console.error("Auto-save failed:", err);
    }
  };

  // Fetching Previous Detail If user is Editting an existing session
  useEffect(() => {
    if (editingSession) {
      setForm({
        _id: editingSession._id,
        title: editingSession.title,
        tags: editingSession.tags,
        json_file_url: editingSession.json_file_url,
        status: editingSession.status || "draft",
      });
      setIsDraftSaved(true); // assume existing session is saved
    }
  }, [editingSession]);

  // Save Draft After 10s of Inactivity
  useEffect(() => {
    // Avoid on first render
    if (!prevFormRef.current) {
      prevFormRef.current = form;
      return;
    }

    // Only run if form has actually changed
    if (!isEqual(prevFormRef.current, form)) {
      if (timer) clearTimeout(timer);

      const timeout = setTimeout(() => autoSave(), 5000); // 10 seconds
      setTimer(timeout);

      prevFormRef.current = form;
      return () => clearTimeout(timeout);
    }
  }, [form]);

  // Publish button handler
  const handleSubmit = async (status) => {
    if (status === "published" && !form._id) {
      showError("Please save the draft before publishing.");
      return;
    }
    try {
      setIsPublishing(true);
      const payload = { ...form, status };
      const res = await API.post("/api/sessions/my-sessions/publish", payload);
      setForm((prev) => ({ ...prev, _id: res.data._id }));
      showSuccess("Publish Success");
      navigate("/");
    } catch (err) {
      console.error("Session Publish failed:", err.message);
      showError("Publish Session Error");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen w-full flex justify-center items-start bg-gradient-to-br from-white via-blue-50 to-blue-100 py-10 px-4">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-blue-200 p-8 space-y-6">
          <h2 className="text-2xl font-extrabold text-blue-900 text-center">
            Create / Edit Wellness Session
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block mb-1 text-blue-800 font-semibold">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border border-blue-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 bg-white text-blue-900 placeholder:text-blue-400"
                placeholder="Enter session title"
              />
            </div>

            <div>
              <label className="block mb-1 text-blue-800 font-semibold">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                className="w-full border border-blue-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 bg-white text-blue-900 placeholder:text-blue-400"
                placeholder="e.g. yoga, meditation"
              />
            </div>

            <div>
              <label className="block mb-1 text-blue-800 font-semibold">
                JSON File URL
              </label>
              <input
                type="text"
                name="json_file_url"
                value={form.json_file_url}
                onChange={handleChange}
                className="w-full border border-blue-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 bg-white text-blue-900 placeholder:text-blue-400"
                placeholder="https://example.com/session.json"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => handleSubmit("draft")}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-5 py-2.5 rounded-lg transition duration-150"
            >
              📝 Save as Draft
            </button>
            <button
              disabled={!isDraftSaved || isPublishing}
              onClick={() => handleSubmit("published")}
              className={`font-semibold px-5 py-2.5 rounded-lg transition duration-150 ${
                !isDraftSaved || isPublishing
                  ? "bg-blue-300 text-white cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {isPublishing ? "Publishing..." : "🚀 Publish"}
            </button>
          </div>

          {lastSaved && (
            <p className="text-sm text-green-700 mt-4 text-center">
              Auto-saved at <span className="font-medium">{lastSaved}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Createsession;
