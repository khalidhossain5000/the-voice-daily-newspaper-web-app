import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../Shared/Loading/Loading";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const UpdateProfile = () => {
  const { loading, updateUserProfile, user, setUser } = useAuth();
  const [updatedPic, setUpdatedPic] = useState(user?.photoURL);
  const axiosSecure=useAxiosSecure()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedName = e.target.updatedName.value;
    const updatedPhoto = updatedPic;
    //UPDATE INFO IN THE DB
    const updatedDbInfo={
        name:updatedName,
        profilePic:updatedPhoto
    }
    const res=await axiosSecure.patch(`/users?email=${user?.email}`,updatedDbInfo)
    console.log("res ",res);
    //update user profiel
    updateUserProfile({ displayName: updatedName, photoURL: updatedPhoto })
      .then(() => {
        setUser({ ...user, displayName: updatedName, photoURL: updatedPhoto });
        alert("user info updated");
      })
      .catch((error) => {
        console.log("error updated", error);
      });
  };
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];

    const formData = new FormData();
    formData.append("image", image);

    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_Imgbb_Key
    }`;
    const res = await axios.post(imagUploadUrl, formData);

    setUpdatedPic(res.data.data.url);
  };
  if (loading) return <Loading />;
  return (
    <div className="bg-gray-300 p-6 shadow-2xl rounded-xl mx-12">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="updatedName"
            defaultValue={user?.displayName}
            className="border p-2 w-full"
          />
        </div>
        {/* updaetd image */}
        <div>
          <label htmlFor="image" className="block mb-2 text-sm">
            Select Image:
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
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
