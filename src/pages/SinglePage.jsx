import Slider from "../components/Slider";
import Map from "../components/Map";
import { CiLocationOn } from "react-icons/ci";
import { useLoaderData, useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios.js";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { showToast } from "../lib/showToast.js";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
      showToast("error","You should be logged in")
      return;
    }

    try {
      const res = await axiosInstance.post("/users/save", {
        postId: post._id,
      });
      setSaved((prev) => !prev);
      showToast("success", `${saved ? "Post Unsaved" : "Post Saved"}`);
    } catch (error) {
      console.log(error);
      showToast("error", "Something went wrong");
      setSaved((prev) => !prev);
    }
  };

  const handleCreateChat = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!currentUser) {
      navigate("/login");
      showToast("error","You should be logged in")
      return;
    }
  
    try {
      const chatRes = await axiosInstance.post("/chats", { recieverId: post.userId._id });
      if (chatRes?.data?.message === "chat already exists") {
        showToast("success", "Chat already created");
        showToast("success", "Visit Profile page");
        return;
      }
  
      const messageRes = await axiosInstance.post(`/messages/${chatRes.data._id}`, { text });
  
      if (messageRes) {
        showToast("success", "Message sent successfully");
      }
  
      e.target.reset();
    } catch (error) {
      console.error("Error creating chat or sending message:", error);
      showToast("error", "Failed to create chat or send message");
    }
  };
  

  return (
    <div className="flex w-full justify-center p-4">
      <div className="flex flex-col gap-8 lg:gap-4 lg:flex-row justify-center max-w-[1280px] h-full">
        <div className="lg:w-[60%] lg:pr-12">
          <div>
            <Slider images={post.images} />
          </div>

          <div className="info mt-4">
            <div className="top flex justify-between items-start">
              <div className="flex flex-col gap-2 lg:gap-4">
                <h1 className="text-2xl font-medium">{post.title}</h1>
                <div className="flex gap-2 items-center text-gray-500 text-sm">
                  <CiLocationOn className="w-5 h-5" />
                  <span>{post.address}</span>
                </div>
                <div className="p-1 bg-amber-300 rounded-md text-lg font-light w-max">
                  ₹ {post.price}
                </div>
              </div>

              <div className="user flex items-center gap-2 md:gap-4 bg-red-50 p-2 text-sm md:text-lg rounded-md md:rounded-xl">
                <img
                  src={post.userId.avatar}
                  alt={post.userId.username}
                  className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover"
                />
                <span className="font-medium">{post.userId.username}</span>
              </div>
            </div>

            <div className="bottom mt-6 text-sm text-gray-700">
              {post.Description}
            </div>
          </div>
        </div>

        <div className="lg:w-[40%]">
          <p className="text-lg font-bold mt-4 mb-2 z-10">Location</p>
          <div className="h-64 bg-gray-100 rounded-md mb-6">
            <Map items={[post]} />
          </div>

          <div className="gap-4 mt-3">
            <form onSubmit={handleCreateChat} className="flex items-end gap-4">
              <textarea
                placeholder="Type a message..."
                name="text"
                className="h-20 sm:w-60 xl:w-80 border rounded-md p-2 focus:outline-none"
              ></textarea>
              <button
                type="submit"
                className="cursor-pointer border h-10 py-2 px-4 rounded-md hover:bg-gray-200 hover:shadow-md"
              >
                Send a message
              </button>
            </form>
            <button
              onClick={handleSave}
              className={`flex mt-4 items-center px-4 py-2 border rounded-md cursor-pointer ${
                saved ? "bg-amber-300" : ""
              }`}
            >
              <img src="/save.png" alt="Save" className="w-5 h-5 mr-2" />
              {saved ? "Saved" : "Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
