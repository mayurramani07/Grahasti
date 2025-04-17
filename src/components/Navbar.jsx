import React, { useContext, useEffect } from "react";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNotificationStore } from "../lib/notificationStore";
import { SocketContext } from "../context/SocketContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const fetchNotifications = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  useEffect(() => {
    if (currentUser) {
      fetchNotifications();
    }
  }, [currentUser, fetchNotifications]);

  useEffect(() => {
    if (socket && currentUser) {
      socket.on("newNotification", (data) => {
        fetchNotifications();
      });

      return () => {
        socket.off("newNotification");
      };
    }
  }, [socket, currentUser, fetchNotifications]);

  return (
    <div className="flex justify-center">
      <div className="h-[70px] w-full max-w-[1280px] flex justify-between items-center md:bg-white bg-gray-50 sm:px-4 px-8">
        <div className="w-[60%] flex items-center text-3xl gap-4 cursor-pointer">
          <div className="group flex items-center gap-2 hover:text-gray-700">
            <HiOutlineHomeModern />
            <a href="/" className="sm:hidden lg:inline cursor-pointer md:mr-4">
              Grahasti
            </a>
          </div>
        </div>

        {currentUser ? (
          <div className="w-[40%] h-full flex gap-4 justify-end items-center pr-4">
            <img
              src={currentUser.avatar || "noavatar.jpg"}
              alt="avatar"
              className="h-10 w-10 rounded-full object-cover"
            />
            <p className="hidden sm:inline">{currentUser.username}</p>
            <Link
              to="/profile"
              className="bg-[#fece51] hover:bg-amber-500 h-10 w-18 hover:rounded-lg hover:h-11 hover:w-20 transition-all duration-500 p-2 rounded-md sm:flex items-center justify-center relative"
            >
              Profile
              {number > 0 && (
                <span className="bg-red-400 rounded-full h-5 w-5 absolute -top-2 -right-2 flex justify-center items-center">
                  {number}
                </span>
              )}
            </Link>
          </div>
        ) : (
          <div className="w-[40%] h-full flex gap-4 justify-end items-center sm:pr-4">
            <Link
              to="/login"
              className="sm:p-3 h-10 w-18 flex items-center justify-center bg-blue-500 text-xs sm:text-sm font-semibold text-white hover:shadow-lg hover:shadow-slate-300 transition-all duration-500 rounded-lg"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="bg-blue-500 text-white text-xs sm:text-sm font-semibold h-10 w-18 hover:rounded-sm hover:shadow-gray-00 hover:shadow-lg transition-all duration-500 p-2 rounded-md flex items-center justify-center"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
