import React, { useState } from "react";
import { showSuccess, showError, showWarn } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { setToken } from "../services/auth";
function Login() {
  const [fields, setfields] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const handlechange = (e) => {
    // Save the Changes of Input Fields
    const { name, value } = e.target;
    setfields((prevFields) => ({ ...prevFields, [name]: value }));
  };


  const handleSubmit = async (e) => {
    // Prevents Page Reload
    e.preventDefault();
    try {
      setloading(true);
      const { email, password } = fields;

      // Early exit if Email not valid
      if (!/\S+@\S+\.\S+/.test(email)) {
        console.error("Please enter a valid email.");
        showWarn("Invalid Email!");
        return;
      }
      // Early exit if Password not valid
      if (password.length < 6) {
        console.error("Password should be at least 6 characters.");
        showWarn("Invalid Password!");
        return;
      }

      // Login API Call
      const response = await API.post("/api/auth/login", {
        email,
        password,
      });
      const data=response.data;

      showSuccess("Logged in successfully!");
      setToken(data.token);
      navigate("/");
    } catch (error) {
      console.log("ERROR :: WHILE LOGIN!!" + error.message);
      showError("Login failed!");
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="register_background">
      <div className="cover-bg ">
        <div className="heading m-4 text-[2rem]  font-bold ">
          Resume your Joruney with us...
        </div>
        <div className="Form_container">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 w-[80vw] md:w-[35vw]"
          >
            <div className="py-3 font-bold text-[2rem] text-center">Login</div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                onChange={handlechange}
                name="email"
                id="email"
                type="email"
                value={fields.email}
                placeholder="Email"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="Pass"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                onChange={handlechange}
                name="password"
                id="Pass"
                type="password"
                value={fields.password}
                placeholder="Password"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* NICE TO HAVE Feature */}
            <div className="text-right cursor-pointer text-blue-500">
              Forgot Password?
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className="text-center">
              New user?{" "}
              <a
                href="/register" target="_blank"
                className="text-blue-500 underline hover:text-blue-700"
              >
                Sign-up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
