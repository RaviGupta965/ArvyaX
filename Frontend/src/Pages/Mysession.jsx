import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../services/auth";
import API from "../services/api";
import Navbar from "../Components/Navbar";
import {showSuccess,showError} from '../utils/toast'
const MySessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Edit Handler
  const handleEdit = (session) => {
    // navigate to edit page
    navigate("/create-session", { state: { session } });
  };

  useEffect(() => {
    // Fetch user's sessions from the backend
    const fetchSessions = async () => {
      try {
        const token = getToken();
        // If token Not Present Redirect user to  Login Page
        if (!token) {
          navigate("/login");
        }
        const res = await API.post("/api/sessions/my-sessions");
        setSessions(res.data);
      } catch (err) {
        console.error("Error fetching sessions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

// Deleting a Session
  const handleDelete = async (session) => {
  const confirmDelete = window.confirm(`Delete session "${session.title}"?`);
  if (!confirmDelete) return;

  try {
    await API.delete(`/api/sessions/my-sessions/delete-session/${session._id}`);
    showSuccess("Session deleted");
    setSessions((prev) => prev.filter((s) => s._id !== session._id));
  } catch (err) {
    console.error("Delete failed:", err);
    showError("Failed to delete session");
  }
};


  return (
    <div>
      <Navbar />
      <div className="p-4 min-h-screen bg-gray-50">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Your Sessions
        </h2>

        {loading ? (
          <div className="text-center text-gray-500 animate-pulse">
            Loading...
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-gray-600">No sessions found.</div>
        ) : (
          <ul className="space-y-4 animate-fade-in">
            {sessions.map((s, index) => (
              <li
                key={s._id}
                className="border p-4 rounded-xl bg-white shadow-md transition transform hover:scale-[1.01] hover:shadow-lg duration-300 ease-in-out"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-lg text-indigo-700">
                    {s.title}
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      s.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {s.status === "published" ? "Published" : "Draft"}
                  </span>
                </div>

                <div className="text-sm text-gray-500 mt-1">
                  Last updated: {new Date(s.updated_at).toLocaleDateString()}
                </div>

                <div className="text-sm text-gray-600 mt-0.5">
                  Created by: {s.user_id.fullname || "Unknown"}
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    className="px-4 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                    onClick={() => handleEdit(s)}
                  >
                    Edit
                  </button>

                  <button
                    className="px-4 py-1 text-sm text-white bg-red-600 rounded hover:bg-blue-700"
                    onClick={() => handleDelete(s)}
                  >
                    Delete
                  </button>
                  {s.status === "draft" && (
                    <button
                      className="px-4 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
                      onClick={() => handlePublish(s._id)}
                    >
                      Publish
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MySessions;
