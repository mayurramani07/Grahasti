import axiosInstance from "./axios";

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
  const userResponse = await axiosInstance("/users/profilePosts");
  const chatResponse = await axiosInstance("/chats");

  return { 
    posts: userResponse.data, 
    chats: chatResponse.data,
  }; 
}