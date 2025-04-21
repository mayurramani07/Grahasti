import axiosInstance from "./axios";
import { redirect } from "react-router-dom";

export const singlePageLoader = async ({request, params}) => {
  const res = await axiosInstance("/posts/"+params.id);
  return res.data;
}

export const listPageLoader = async ({request, params}) => {
  const query = request.url.split("?")[1];
  const res = await axiosInstance("/posts?" + query);
  return res.data;
}

export const profilePageLoader = async () => {
  try {
    const userResponse = await axiosInstance("/users/profilePosts");
    const chatResponse = await axiosInstance("/chats");

    return { 
      posts: userResponse.data, 
      chats: chatResponse.data,
    }; 
  } catch (error) {
    if (error.response?.status === 401) {
      throw redirect("/login");
    }
    throw err;
  }
  
}