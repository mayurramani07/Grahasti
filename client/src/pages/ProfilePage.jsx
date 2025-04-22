import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Chat from "../components/Chat";
import List from "../components/List";
import axiosInstance from "../lib/axios.js";
import { showToast } from '../lib/showToast.js'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";


function ProfilePage() {
  const posts = useLoaderData().posts;
  const chats = useLoaderData().chats;
  const navigate = useNavigate();

  const { currentUser, updateUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
      updateUser(null);
      navigate('/');
      showToast('success', "Logout successful");
    } catch (error) {
      console.log("Error in logout in Profile page");
      showToast('error', error.response?.data?.message);
    }
  }

  return (
    <div className="flex justify-center mt-4">

      <div className="flex h-full w-full max-w-[1280px] gap-8 px-4 flex-col lg:flex-row lg:overflow-y-scroll">
        <div className="lg:h-[90vh] lg:w-[60%] lg:overflow-y-scroll">
          <div className="flex flex-col gap-12">
            <div className="flex w-full justify-between">
              <h1 className="text-2xl sm:text-3xl font-light">User Information</h1>
              <Link to='/profile/update' className="bg-[#fece51] hover:bg-amber-400 p-1 md:p-2 rounded-md cursor-pointer">Update Profile</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="flex gap-4 items-center">
                Avatar:
                <img
                  src={currentUser.avatar || "noavatar.jpg"}
                  alt=""
                  className="h-10 w-10 rounded-full object-cover"
                  />
              </span>
              <span>
                Username: <b>{currentUser.username}</b>
              </span>
              <span>
                E-mail: <b>{currentUser.email}</b>
              </span>
              <button onClick={handleLogout} className="bg-[#fece51] cursor-pointer w-fit hover:bg-amber-400 p-1 md:p-2 rounded-md">Logout</button>
            </div>
            <div className="flex justify-between">
              <h1 className="text-2xl sm:text-3xl font-light">My List</h1>
              <Link to="/add">
                <button className="bg-[#fece51] cursor-pointer hover:bg-amber-400 p-1 md:p-2 rounded-md">Create New Post</button>
              </Link>
            </div>

            <List posts={posts.userPosts}/>
            {/* {console.log(posts)} */}
            <div className="title">
              <h1 className="text-3xl font-light">Saved List</h1>
            </div>

            <List posts={posts.savedPosts}/>
          </div>
        </div>
        <div className="lg:w-[40%]">
          <div className="wrapper">
            <Chat chats={chats}/>
            {/* {console.log(chats)} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;