import { useState } from "react";
import { showSuccess, showError, showWarn } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { setToken } from "../services/auth";
function Register() {
  const [fields, setfields] = useState({
    fullname: "",
    email: "",
    password: "",
    "confirm-password": "",
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
      const { fullname, email, password } = fields;

      if (!fullname) {
        showWarn("Username Required!");
        return;
      }

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

      // Matching password and confirm password
      if (password !== fields["confirm-password"]) {
        alert("Confirm Password must be same as Password.");
        showWarn("Invalid Password!");
        return;
      }

      // Register API Call
      const response = await API.post("/api/auth/register", {
        fullname,
        email,
        password,
      });
      console.log(response);
      const data = await response.data;

      showSuccess("User Register Successfully!");
      setToken(data.token);
      navigate("/");
    } catch (error) {
      console.log("ERROR :: WHILE REGISTER!!" + error);
      showError("Register failed!!");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="register_background">
      <div className="cover-bg ">
        <div className="heading m-4 text-[2rem]  font-bold ">
          Join The Revolution with us...
        </div>
        <div className="Form_container">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 w-[80vw] md:w-[35vw]"
          >
            <div className="py-3 font-bold text-[2rem] text-center">
              Register
            </div>
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="fullname"
                type="text"
                name="fullname"
                placeholder="Your Name"
                value={fields.fullname}
                onChange={handlechange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={fields.email}
                placeholder="Email"
                onChange={handlechange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                name="password"
                id="password"
                type="password"
                value={fields.password}
                placeholder="Password"
                onChange={handlechange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="confirm"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                name="confirm-password"
                id="confirm"
                type="password"
                value={fields["confirm-password"]}
                placeholder="Must be Same as your Password"
                onChange={handlechange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              {loading ? "Submitting" : "Create Account"}
            </button>
            <div className="text-center">
              Already have an Account? &nbsp;
              <a href="/login" className="underline text-blue-500 hover:text-blue-700">Sign-in</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
