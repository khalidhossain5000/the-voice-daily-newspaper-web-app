import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { tagOptions } from "./Data/TagOptions";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { FiUpload } from "react-icons/fi";
import { CircleLoader } from "react-spinners";




const AddArticle = () => {
  const [articlePic, setArticlePic] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [articleSendingLoader,setArticleSendingLoader]=useState(false)
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  //getting publisher data from db
  const { data: publishers = [], isLoading } = useQuery({
    queryKey: ["publishers", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/publishers");
      return res.data;
    },
  });
  //  Map data to making it usable format for react multi select
  const publisherOptions = publishers.map((pub) => ({
    value: pub._id,
    label: pub.publisherName,
  }));

  const {
    register,
    handleSubmit,
    control,
    reset
    // formState: { errors },
  } = useForm({
    defaultValues: {
      publisher: null,
      tags: [],
    },
  });

  const onSubmit = (data) => {
    // console.log("this is data", data);
    const articlesData = {
      authorName: user?.displayName,
      authorEmail: user?.email,
      auhtorPhoto: user?.photoURL,
      ...data,
      articlePic,
      views: 0,
      status: "pending",
      createdAt: new Date().toISOString(),
      isPremium: false,
    };
    //LOAIDNG TRUE UNTIL DATA SEND COMPLETED
    setArticleSendingLoader(true)
    //SENDING DATA TO DB
    axiosSecure
      .post("/articles", articlesData)
      .then((res) => {
        console.log(res);
        if (res.data.insertedId) {
          alert("Article send");
          setArticleSendingLoader(false)
          reset()
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //iamge
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (image) {
      setPreviewUrl(URL.createObjectURL(image)); // ✅ preview দেখানোর জন্য
    }
    const formData = new FormData();
    formData.append("image", image);
    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_Imgbb_Key
    }`;

    const res = await axios.post(imagUploadUrl, formData);
    setArticlePic(res.data.data.display_url);
  };

  return (
    <div className="bg-[#e8efef] min-h-screen mb-6 px-3">
      <div className="max-w-7xl w-full mx-auto py-6 lg:py-12 ">
        <h1 className="text-center md:text-left text-5xl lg:text-6xl urbanist font-bold text-[#211f54]">
          Add Article
        </h1>
      </div>

      <div className="max-w-7xl md:mx-auto bg-white w-full p-6 shadow-2xl rounded-xl ">
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="text-center">
            <h2 className="text-gray-800 py-3 text-2xl text-left md:w-9/12 mx-auto">Add Article</h2>
          <input
            type="text"
            className="mx-auto border border-gray-500 w-full md:w-9/12 p-2 rounded-md placeholder:text-[#211f54] focus:outline-none
             focus:ring-0
             focus:shadow-[0_0_0_4px_rgba(33,31,84,0.2)]
             transition duration-300"
            placeholder="Article Title"
            {...register("articleTitle")}
          />
          </div>
          <div className="mx-auto border border-gray-600 p-6 md:w-9/12 my-2 rounded-xl shadow-md">
            <label htmlFor="image" className="block text-gray-800 py-3 text-xl">
              Select Article Image:
            </label>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-4 w-12 h-12 rounded-full shadow mb-2 lg:mb-5"
              />
            )}
            <label
              htmlFor="image"
              className="mx-auto flex items-center gap-3 px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 transition"
            >
              <FiUpload className="text-xl" />
              <span>Choose Image</span>
            </label>

            <input
              onChange={handleImageUpload}
              className="hidden mx-auto"
              type="file"
              id="image"
              name="image"
              accept="image/*"
            />
          </div>
          {/* tag code */}
          {/* Tags field */}
          <div className="">
            <label
            style={{ display: "block", marginTop: "20px", marginBottom: "5px" }}
            className="block text-gray-800 py-3 text-xl md:w-9/12 mx-auto"
          >
            Tags
          </label>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={tagOptions}
                isMulti
                placeholder="Select Tags"
                onChange={(selectedOptions) => field.onChange(selectedOptions)}
                value={field.value}
                className="border border-gray-100 w-full md:w-9/12  mx-auto p-2 rounded-md placeholder:text-[#211f54] focus:outline-none focus:ring-0
             focus:shadow-[0_0_0_4px_rgba(33,31,84,0.2)]
             transition duration-300"
              />
            )}
          />
          </div>
          {/* PUBLISHER DATA */}
          {/* Publisher field */}
          <div>
            <label style={{ display: "block", marginBottom: "5px" }} className="block text-gray-800 py-3 text-xl w-full md:w-9/12 mx-auto">
            Publisher
          </label>
          <Controller
            name="publisher"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={publisherOptions}
                placeholder="Select Publisher"
                onChange={(selectedOption) => field.onChange(selectedOption)}
                value={field.value}
                isLoading={isLoading}
                className="border border-gray-100 w-full md:w-9/12 mx-auto p-2 rounded-md placeholder:text-[#211f54] focus:outline-none focus:ring-0
             focus:shadow-[0_0_0_4px_rgba(33,31,84,0.2)]
             transition duration-300"
              />
            )}
          />
          </div>
           <div className="mx-auto text-center">
            <label
            
            className="block text-gray-800 py-3 text-xl w-full md:w-9/12 text-left mx-auto"
          >
            Descriptions
          </label>
          <textarea
            rows={3}
            cols={50}
            placeholder="Add Article Details"
            className="border w-full md:w-9/12 rounded-xl shadow-sm my-3 p-6 mx-auto"
            {...register("descriptions")}
          />
           </div>

          <div className="text-center">
            {
              articleSendingLoader ? <div className="w-9/12 mx-auto text-3xl"><CircleLoader /></div>: <input className="mt-3 px-6 lg:px-12 py-2 lg:py-3 rounded-sm shadow-md bg-[#16b7cc] w-full md:text-xl font-bold text-white cursor-pointer lg:w-9/12 mx-auto" type="submit" />
            }
            

          </div>
          

        </form>
      </div>
    </div>
  );
};

export default AddArticle;
