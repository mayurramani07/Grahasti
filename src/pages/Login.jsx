import { Link } from "react-router-dom";
import axiosInstance from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { showToast } from "../lib/showToast";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const [isLoading, SetIsLoading] = useState(false);
  
  const {updateUser} = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    SetIsLoading(true);
    const formData = new FormData(e.target);
    const identifier = formData.get("identifier");
    const password = formData.get("password");

    try {
      const res = await axiosInstance.post('/auth/login', {
        identifier,
        password
      });

      if(res.data.message  == "verify email"){
        showToast('error', "You have to verify your email first");
        navigate("/verify-token");
        return;
      }

      console.log(res.data);

      updateUser(res.data);
      showToast('success', "Login successful!");
      navigate('/');
    } catch (error) {
      console.log(error.response?.data?.message)
      showToast('error', error.response?.data?.message || "An error occurred");
    } finally {
      SetIsLoading(false);
    }
  };

  return (
    <div className="login flex items-center justify-center min-h-screen bg-gray-50">
      <div className="formContainer bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-2xl font-bold text-center text-gray-700">
            Welcome Back
          </h1>
          <input
            name="identifier"
            type="text"
            required
            placeholder="Username or Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-3 rounded-md font-semibold hover:bg-blue-600 transition duration-200 cursor-pointer"
          >
            {isLoading? 'Loading...' : 'Login'}
          </button>
          <div
            
            className="flex justify-center gap-1 text-center"
          >
            Don't have an account? 
            <Link 
            to="/register"
            className=" text-blue-500 hover:text-blue-700">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
