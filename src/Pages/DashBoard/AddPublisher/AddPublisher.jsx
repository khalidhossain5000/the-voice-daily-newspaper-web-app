import axios from "axios";
import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddPublisher = () => {
  const [publisherPic, setPublisherPic] = useState("");
  const axiosSecure=useAxiosSecure()
  const handlePublisher=e=>{
    e.preventDefault()
    const form=e.target
    const publisherName=form.publisher.value;
    const publsiherData={
        publisherName,
        publisherPic
    }
    //data sending to mongo db here
    axiosSecure.post('/publishers',publsiherData)
    .then((res)=>{
        console.log(res.data);
        if(res.data.publisherId){
            alert("Publisher added successfully")
        }
    })
    .catch(error=>{
        console.log(("this is ",error));
    })
    console.log("publisher name",publisherName);
  }
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
      <h2>Add Publisher</h2>
      <form onSubmit={handlePublisher}>
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
      </form>
    </div>
  );
};

export default AddPublisher;
