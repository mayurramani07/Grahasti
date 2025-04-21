import { Link, useNavigate } from "react-router-dom";
import { showToast } from '../lib/showToast.js'
import axiosInstance from "../lib/axios.js";
import { useState } from "react";
import Suggestions from "../components/Suggestions.jsx";

function Register() {
  const [signingIn, setSigningIn] = useState(false);
  const [passConstraints, setPassConstraints] = useState({
    minLength: false,
    containLetter: false,
    containSpecial: false,
    containNumber: false,
  });
  const [showRules, setShowRules] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSigningIn(true);
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await axiosInstance.post('/auth/register', {
        username,
        email,
        password
      });

      showToast('success', "Registration successful!");
      navigate('/verify-token');
    } catch (error) {
      console.log(error.response?.data?.message)
      if(error.response?.data?.message === "Username already exist"){
        setShowSuggestions(true);
        generateSuggestions(username);
      }

      showToast('error', error.response?.data?.message || "An error occurred");
    } finally {
      setSigningIn(false);
    }
  };

  const generateSuggestions = (username) => {
    const generatedSuggestions = [];
    for (let i = 1; i <= 3; i++) {
      generatedSuggestions.push(`${username}${Math.floor(Math.random() * 1000)}`);
    }
    setSuggestions(generatedSuggestions);
  };

  const handleChange = (e) => {
    const pass = e.target.value;

    if (!showRules) setShowRules(true);

    const constraints = {
      minLength: pass.length >= 6,
      containLetter: /[a-zA-Z]/.test(pass),
      containSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
      containNumber: /[0-9]/.test(pass),
    };

    setPassConstraints(constraints);

    setIsButtonEnabled(
      constraints.minLength &&
      constraints.containLetter &&
      constraints.containSpecial &&
      constraints.containNumber
    );
  };

  return (
    <div className="register flex items-center justify-center min-h-[90vh] bg-gray-50">
      <div className="formContainer bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <form onSubmit={handleSubmit} className="space-y-5">
          <h1 className="text-2xl font-bold text-center text-gray-700">
            Create Your Account
          </h1>
          <input
            name="username"
            type="text"
            required
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {showSuggestions && <Suggestions suggestions={suggestions}/>}

          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="password"
            type="password"
            required
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {showRules? <div className="text-xs text-red-700">
            <p className={`${passConstraints.minLength? "hidden": "text-red-500"}`}>The password should be atleast of length 6</p>
            <p className={`${passConstraints.containLetter? "hidden": "text-red-500"}`}>The password should contain atleast one letter</p>
            <p className={`${passConstraints.containSpecial? "hidden": "text-red-500"}`}>The password should contain atleast one special character</p>
            <p className={`${passConstraints.containNumber? "hidden": "text-red-500"}`}>The password should contain atleast one number</p>
          </div>: ""}

          <button
            type="submit"
            disabled={!isButtonEnabled}
            className={`w-full bg-blue-500 text-white py-3 rounded-md font-semibold hover:bg-blue-600 transition duration-200 ${isButtonEnabled? "cursor-pointer": ""}`}
          >
            {signingIn? "Signing In...": "Register"}
          </button>
          <div
            
            className="flex justify-center gap-1 text-center"
          >
            Already have an account?
            <Link 
            to="/login" 
            className="text-blue-500 hover:text-blue-700">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
