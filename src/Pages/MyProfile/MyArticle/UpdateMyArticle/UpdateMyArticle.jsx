// import React from 'react';

// const UpdateMyArticle = () => {
//     return (
//         <div>

//         </div>
//     );
// };

// export default UpdateMyArticle;

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { tagOptions } from "../../../AddArticle/Data/TagOptions";
import axios from "axios";
import { useParams } from "react-router";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading/Loading";
import { FiUpload } from "react-icons/fi";
import toast from "react-hot-toast";

import FormLoading from "../../../Shared/Loading/FormLoading";
const UpdateMyArticle = () => {
  const [articlePic, setArticlePic] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [updateLoading,setUpdateLoading]=useState(false)
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { id } = useParams();

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
    setValue
    // formState: { errors },
  } = useForm({
    defaultValues: {
      publisher: null,
      tags: [],
    },
  });
 

  // Fetch article data
  const { data: article, isPending: articleLoading } = useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/articles/${id}`);
      return res.data;
    },
  });




   useEffect(() => {
  if (article?.tags && article.tags.length > 0) {
    setValue("tags", article.tags);
  }
}, [article, setValue]);

useEffect(() => {
  if (article?.publisher) {
    setValue('publisher', article.publisher);
  }
}, [article, setValue]);

  if (articleLoading) return <Loading />;








  
  const onSubmit = (data) => {
    
    const updatedArticleData = {
      ...data,
      articlePic,
      createdAt: new Date().toISOString(),
    };
setUpdateLoading(true)
    //SENDING DATA TO DB
    axiosSecure
      .patch(`/articles/update/${id}`, updatedArticleData)
      .then((res) => {
        
        if (res) {
           toast.success(`Article Updated SuccessFully`, {
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
          setUpdateLoading(false)
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
    <div className="">
      <div className="py-24 bg-gradient-to-tr from-[#7e7dfd] via-white to-[#ffcfff]">
        <h1 className="text-center text-3xl font-bold inter  py-6">
          Update Article
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-7xl mx-auto py-12 lg:py-24 bg-white shadow-xl px-6 lg:px-14"
      >
        <div className="text-center">
          <h2 className="text-gray-800 py-3 text-2xl text-left md:w-9/12 mx-auto">
            Add Article
          </h2>
          <input
            className="mx-auto border border-gray-500 w-full md:w-9/12 p-2 rounded-md placeholder:text-[#211f54] focus:outline-none
             focus:ring-0
             focus:shadow-[0_0_0_4px_rgba(33,31,84,0.2)]
             transition duration-300"
            type="text"
            defaultValue={article?.articleTitle}
            placeholder="Article Title"
            {...register("articleTitle")}
          />
        </div>
        {/* image */}
        <div>
          <label htmlFor="image" className="w-9/12 mx-auto text-left block text-gray-800 py-3 text-xl">
              Select Updated  Image:
            </label>
          {/* <input
            onChange={handleImageUpload}
            className="bg-gray-200 cursor-pointer"
            type="file"
            id="image"
            name="image"
            accept="image/*"
          /> */}

          <div className="mx-auto border border-gray-600 p-6 md:w-9/12 my-2 rounded-xl shadow-md">
            <label htmlFor="image" className="block text-gray-800 py-3 text-xl">
              Select Updated Image:
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
        </div>
        {/* tag code */}
        {/* Tags field */}
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
        {/* PUBLISHER DATA */}
        {/* Publisher field */}
        <label style={{ display: "block", marginBottom: "5px" }} className="block text-gray-800 py-3 text-xl md:w-9/12 mx-auto">
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
              className="border border-gray-100 w-full md:w-9/12  mx-auto p-2 rounded-md placeholder:text-[#211f54] focus:outline-none focus:ring-0
             focus:shadow-[0_0_0_4px_rgba(33,31,84,0.2)]
             transition duration-300"
            />
          )}
        />

           <div className="mx-auto text-center">
            <label
            
            className="block text-gray-800 py-3 text-xl w-full md:w-9/12 text-left mx-auto"
          >
            Descriptions
          </label>
        <textarea
          rows={3}
          cols={40}
          className="border w-full md:w-9/12 rounded-xl shadow-sm my-3 p-6 mx-auto"
          defaultValue={article?.descriptions}
          {...register("descriptions")}
        />
        </div>
        {/* <input
          className="btn btn-warning font-bold block cursor-pointer"
          type="Submit"
          defaultValue="SubmitandUpdate"
        /> */}
        <div className="text-center">
            {
              updateLoading ? <div className="w-9/12 mx-auto text-3xl">
                
                <FormLoading/>
              
              </div>: <input className="mt-3 px-6 lg:px-12 py-2 lg:py-3 rounded-sm shadow-md bg-[#16b7cc] w-full md:text-xl font-bold text-white cursor-pointer lg:w-9/12 mx-auto" type="submit" value="Update Article"/>
            }
            

          </div>
      </form>
    </div>
  );
};

export default UpdateMyArticle;
