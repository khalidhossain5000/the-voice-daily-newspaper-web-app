import axios from "axios";
import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddPublisher = () => {
  const [publisherPic, setPublisherPic] = useState("");
  const axiosSecure = useAxiosSecure();
  const handlePublisher = (e) => {
    e.preventDefault();
    const form = e.target;
    const publisherName = form.publisher.value;
    const publsiherData = {
      publisherName,
      publisherPic,
    };
    //data sending to mongo db here
    axiosSecure
      .post("/publishers", publsiherData)
      .then((res) => {
        console.log(res.data);
        if (res.data.publisherId) {
           toast.success(`Publisher Added SuccessFully`, {
          className: "w-[300px] h-[100px] text-xl font-bold ",
          removeDelay: 1000,
          iconTheme: {
            primary: "#16061e",
            secondary: "#ef54e2",
          },
          style: {
            border: "1px solid #08086c",
            color: "white",
            backgroundImage: "linear-gradient(to bottom right, #050342,#01c3f4 )"
          },
        });
        }
      })
      .catch((error) => {
        console.log(("this is ", error));
      });
    console.log("publisher name", publisherName);
  };
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];

    const formData = new FormData();
    formData.append("image", image);

    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_Imgbb_Key
    }`;
    const res = await axios.post(imagUploadUrl, formData);

    setPublisherPic(res.data.data.url);
  };
  console.log("publisherPic", publisherPic);
  return (
    <div>
      <div className="px-12 w-full lg:w-11/12 mx-auto rounded-2xl shadow-xl h-48 bg-gradient-to-tr from-[#F4F6FE] via-[#E0E2F0] to-[#D4D7E3] flex items-center justify-center relative overflow-hidden ">
        <div className="text-center px-4">
          <h1 className="text-[#211F54] text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
            Add Publisher
          </h1>
        </div>
        {/* Subtle overlay shapes in primary text color */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#211F54] opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#211F54] opacity-10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      </div>
      {/* <form onSubmit={handlePublisher}>
        <input className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"  type="text" name="publisher" placeholder="Enter Publisher Name" />
        <div>
          <label htmlFor="image" className="block mb-2 text-sm">
            Select Publisher Image:
          </label>
          <input
            onChange={handleImageUpload}
            className="bg-gray-200 cursor-pointer"
            type="file"
            id="image"
            name="image"
            accept="image/*"
          />
        </div>
        <input type="submit" value="Add Publisher" className="btn btn-md btn-warning"/>
      </form> */}

      <form
        onSubmit={handlePublisher}
        className="bg-[#e4e6f3] p-6 rounded-2xl shadow-xl mt-12 space-y-5 text-[#211f54] max-w-3xl mx-auto"
      >
        <div>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#211f54] focus:border-transparent transition duration-200 placeholder-gray-500 text-sm bg-white"
            type="text"
            name="publisher"
            placeholder="Enter Publisher Name"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-2">
            Select Publisher Image
          </label>
          <input
            onChange={handleImageUpload}
            className="w-full border border-gray-300 file:bg-[#211f54] file:text-white file:px-4 file:py-2 file:rounded-md file:border-none file:cursor-pointer bg-white rounded-lg text-sm text-[#211f54]"
            type="file"
            id="image"
            name="image"
            accept="image/*"
          />
        </div>

        <input
          type="submit"
          value="Add Publisher"
          className="w-full bg-gradient-to-r from-[#211f54] to-[#4d4ba1] text-white font-semibold py-2 rounded-lg uppercase tracking-wide hover:scale-[1.02] transition duration-200 cursor-pointer shadow"
        />
      </form>
    </div>
  );
};

export default AddPublisher;
