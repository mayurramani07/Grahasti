import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Layout = () => {
  return (
    <div className="h-[100vh] flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
};

const RequiredAuth = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    navigate("/login");
    showToast("error", "You should be logged in");
    return;
  } else {
    return (
      <div className="h-[100vh] flex flex-col">
        <Navbar />
        <Outlet />
      </div>
    );
  }
};

export { Layout, RequiredAuth };
