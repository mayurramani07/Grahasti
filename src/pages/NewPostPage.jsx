import React, { useState } from "react";
import UploadWidget from "../components/UploadWidget";
import axiosInstance from "../lib/axios.js";
import { useNavigate } from "react-router-dom";
import { showToast } from "../lib/showToast.js";

function NewPostPage() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await axiosInstance.post('/posts', {
        ...inputs,
        images: images
      });
      console.log("Post submitted successfully:", res.data);
      showToast('success', "Post added succefully");
      navigate("/"+res.data._id);
    } catch (error) {
      showToast('error', "Something went wrong");
      console.error("Submission error:", error.response);
    }
  };

  return (
    <div className="newPostPage flex bg-gray-50 justify-center p-4">
      <div className="flex md:flex-row flex-col items-center justify-center">

        <div className="md:w-[70%] flex-[2] lg:flex-[3] bg-white max-w-[1280px] shadow-lg rounded-lg h-full md:mx-8 my-6 p-8">
          <h1 className="text-3xl font-semibold text-gray-700 mb-8">Add New Post</h1>
          <div className="wrapper">
            <form onSubmit={handleSubmit} className="grid grid-cols-2 sm:flex flex-wrap justify-between gap-6">
              <div className="item flex flex-col gap-2 sm:w-1/4">
                <label htmlFor="title" className="font-semibold text-gray-600">Title</label>
                <input id="title" name="title" type="text" className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div className="item flex flex-col gap-2 sm:w-1/4">
                <label htmlFor="price" className="font-semibold text-gray-600">Price</label>
                <input id="price" name="price" type="number" className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div className="item flex flex-col gap-2 sm:w-1/4">
                <label htmlFor="address" className="font-semibold text-gray-600">Address</label>
                <input id="address" name="address" type="text" className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div className="item w-full">
                <label htmlFor="Description" className="font-semibold text-gray-600">Description</label>
                <textarea id="Description" name="Description" className="p-4 rounded-lg w-full h-40 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"></textarea>
              </div>
              <div className="item flex flex-col gap-2 sm:w-1/4">
                <label htmlFor="city" className="font-semibold text-gray-600">City</label>
                <input id="city" name="city" type="text" className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div className="item flex flex-col gap-2 sm:w-1/4">
                <label htmlFor="bedroom" className="font-semibold text-gray-600">Bedroom Number</label>
                <input id="bedroom" name="bedroom" type="number" min={1} className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div className="item flex flex-col gap-2 sm:w-1/4">
                <label htmlFor="bathroom" className="font-semibold text-gray-600">Bathroom Number</label>
                <input id="bathroom" name="bathroom" type="number" min={1} className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div className="item flex flex-col gap-2 sm:w-1/4">
                <label htmlFor="latitude" className="font-semibold text-gray-600">Latitude</label>
                <input id="latitude" name="latitude" type="text" className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div className="item flex flex-col gap-2 sm:w-1/4">
                <label htmlFor="longitude" className="font-semibold text-gray-600">Longitude</label>
                <input id="longitude" name="longitude" type="text" className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div className="item flex flex-col gap-2 sm:w-1/4">
                <label htmlFor="type" className="font-semibold text-gray-600">Type</label>
                <select name="type" className="p-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400" defaultValue="rent">
                  <option value="rent">Rent</option>
                  <option value="buy">Buy</option>
                </select>
              </div>
              <div className="item flex flex-col gap-2 sm:w-1/4">
                <label htmlFor="property" className="font-semibold text-gray-600">Property</label>
                <select name="property" className="p-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                  <option value="land">Land</option>
                </select>
              </div>

              <button type="submit" className="sendButton w-full sm:w-1/4 sm:h-16 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition cursor-pointer">
                Add
              </button>
            </form>
          </div>
        </div>

        <div className="hello md:w-[30%] flex flex-col items-center justify-center gap-4">
          {images.map((image, index) => (
            <div key={index} className="w-[90%] shadow-md shadow-gray-300 rounded-lg">
              <img src={image} alt={`Uploaded ${index}`} className="h-60 w-full rounded-lg object-cover" />
            </div>
          ))}

          <UploadWidget
            uwConfig={{
              cloudName: 'du53jbn7x',
              uploadPreset: 'estate',
              multiple: true,
              folder: "posts",
            }}
            setState={setImages}
          />
        </div>
      </div>
    </div>
  );
}

export default NewPostPage;
