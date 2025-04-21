import React, { useState } from "react";
import axiosInstance from "../lib/axios.js";
import { showToast } from "../lib/showToast.js";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else setOtp(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/auth/verifyOTP", { email, otp });
      console.log(res.data);

      showToast("success", "Email verification successful!");
      navigate('/login');
    } catch (error) {
      console.log(error.response?.data?.message);
      showToast("error", error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Verify Email
        </h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          Enter the OTP sent to your email address
        </p>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              OTP
            </label>
            <input
              type="number"
              id="otp"
              name="otp"
              value={otp}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter OTP"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-white cursor-pointer bg-blue-500 hover:bg-blue-600 rounded-md focus:ring-2 focus:ring-blue-400"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
