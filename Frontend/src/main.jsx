import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Register from "./Pages/Register.jsx";
import Login from "./Pages//Login.jsx";
import Dashboard from "./Pages//Dashboard.jsx";
import MySessions from "./Pages/Mysession.jsx";
import ProtectedRoute from "./services/ProtectedRoutes.jsx";
import Createsession from "./Pages/Createsession.jsx";
import { ToastContainer, toast } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Dashboard Route */}
        <Route path="/" element={<Dashboard />} />
        {/* My-session Route */}
        <Route
          path="/create-session"
          element={
            <ProtectedRoute>
              <Createsession />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Dashboard />} />
        {/* Register Route */}
        <Route path="/register" element={<Register />} />

        {/* sessions of Particular User */}
        <Route
          path="/my-sessions"
          element={
            <ProtectedRoute>
              <MySessions />
            </ProtectedRoute>
          }
        />
        {/* Login Route */}
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </BrowserRouter>
  </StrictMode>
);
