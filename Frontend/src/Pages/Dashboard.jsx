import { useEffect, useState } from "react";
import ImageCarousel from "../Components/Poster";
import Navbar from "../Components/Navbar";
import API from "../services/api";
const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicSessions = async () => {
      try {
        const res = await API.get("/api/sessions/");
        console.log(res.data)
        setSessions(res.data);
      } catch (err) {
        console.error("Error fetching public sessions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicSessions();
  }, []);

  return (
    <div className="min-h-screen bg-[#aca9f6]">
      <Navbar />
      <ImageCarousel />
      <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-8 drop-shadow">
        🌿 Public Wellness Sessions
      </h2>

      {loading ? (
        <div className="text-center text-gray-600 text-lg">
          Loading sessions...
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {sessions.map((session) => (
                <div
                  key={session._id}
                  className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all p-5 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 break-words">
                      {session.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-3">
                      👤{" "}
                      <span className="font-medium">
                        {session.user_id?.fullname || "Unknown"}
                      </span>
                    </p>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-1">
                        Tags:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(Array.isArray(session.tags)
                          ? session.tags
                          : session.tags.split(",")
                        ).map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs"
                          >
                            #{tag.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <a
                    href={session.json_file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm text-indigo-600 hover:underline"
                  >
                    🔗 View JSON File
                  </a>
                </div>
              ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
