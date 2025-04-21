import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { showToast } from "../lib/showToast";
import axiosInstance from "../lib/axios";
import UploadWidget from "../components/UploadWidget";

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [updating, setUpdating] = useState(false);
  const [avatar, setAvatar] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = currentUser.email;
    const password = formData.get("password");
    // console.log({username, email, password})

    try {
      const res = await axiosInstance.put(`/users/${currentUser._id}`,{
        username, 
        email, 
        password, 
        avatar: avatar[0],
      })

      showToast('success', "Profile updated successfully");
      updateUser(res.data);

    } catch (error) {
      console.log(error.response)
      showToast('error', error.response?.data?.message || "An error occurred");    
    } finally {
      setUpdating(false);
    }
  } 

  return (
    <div className="flex items-center justify-center gap-20 bg-gray-100 min-h-screen py-8 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Update Profile</h1>
          <div className="space-y-1">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              disabled
              defaultValue={currentUser.email}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              minLength={3}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {updating? 'Updating': 'Update'}
          </button>
        </form>
      </div>
      <div className="mt-8 flex flex-col items-center justify-center gap-2">
        <img
          src={ avatar[0] || currentUser.avatar || "/noavatar.jpg"}
          alt=""
          className="rounded-full size-44 object-cover shadow-md"
        />
        <UploadWidget uwConfig={{
          cloudName: 'du53jbn7x',
          uploadPreset: 'estate',
          multiple: false,
          maxImagrFileSize: 2000000,
          folder: "avatars",
        }}
        setState={setAvatar}
        />
        {console.log(avatar)}
      </div>
        
    </div>
  );
}

export default ProfileUpdatePage;