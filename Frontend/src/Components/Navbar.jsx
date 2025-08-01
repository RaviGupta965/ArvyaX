import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, removeToken } from "../services/auth";
import { Menu, X } from "lucide-react";
const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    removeToken();
    setAuthenticated(false); // update UI
  };
  return (
     <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md px-4 py-3">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="text-xl font-bold">Arvyax</div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-6 items-center">
          <a href="/" className="hover:underline">Home</a>
          <a href="/create-session" className="hover:underline">Create Session</a>
          <a href="/my-sessions" className="hover:underline">My Sessions</a>
          {authenticated ? (
            <button
              onClick={handleLogout}
              className="bg-white text-indigo-600 font-medium px-4 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-indigo-600 font-medium px-4 py-1 rounded hover:bg-gray-100"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu links */}
      {isOpen && (
        <div className="md:hidden mt-3 space-y-2 px-4 z-[1]">
          <a href="/" className="block hover:underline">Home</a>
          <a href="/create-session" className="block hover:underline">Create Session</a>
          <a href="/my-sessions" className="block hover:underline">My Sessions</a>
          {authenticated ? (
            <button
              onClick={handleLogout}
              className="w-full bg-white text-indigo-600 font-medium px-4 py-2 rounded hover:bg-gray-100 mt-2"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/login");
              }}
              className="w-full bg-white text-indigo-600 font-medium px-4 py-2 rounded hover:bg-gray-100 mt-2"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};
export default Navbar;
