// import React from 'react';

// const UpdateMyArticle = () => {
//     return (
//         <div>
            
//         </div>
//     );
// };

// export default UpdateMyArticle;



import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { tagOptions } from '../../../AddArticle/Data/TagOptions'
import axios from "axios";
import { useParams } from "react-router";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading/Loading";
const UpdateMyArticle = () => {
  const [articlePic, setArticlePic] = useState("");
  const axiosSecure = useAxiosSecure();
  const {user}=useAuth()

  const {id}=useParams()
  
  //getting publisher data from db 
    const { data: publishers = [], isLoading } = useQuery({
    queryKey: ["publishers",user?.email],
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
    // formState: { errors },
  } = useForm({
    defaultValues: {
      publisher: null,
      tags: [],
    },
  });
   // Fetch article data
  const { data: article, isLoading:articleLoading } = useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/articles/${id}`);
      return res.data;
    },
  });

  if(articleLoading) return <Loading/>
  const onSubmit = (data) => {
    // console.log("this is data", data);
    const updatedArticleData = {
      ...data,
      articlePic,
      createdAt: new Date().toISOString(),
     
    };

    //SENDING DATA TO DB
    axiosSecure.patch(`/articles/update/${id}`, updatedArticleData)
      .then((res) => {
        console.log(res);
        if (res.data.insertedId) {
          alert("Article send");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //iamge
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];

    const formData = new FormData();
    formData.append("image", image);
    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_Imgbb_Key
    }`;

    const res = await axios.post(imagUploadUrl, formData);
    setArticlePic(res.data.data.display_url);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 lg:py-24">
      <h1>Add Article</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          defaultValue={article?.articleTitle}
          placeholder="Article Title"
          {...register("articleTitle")}
        />
        <div>
          <label htmlFor="image" className="block mb-2 text-sm">
            Select Article Image:
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
        {/* tag code */}
        {/* Tags field */}
        <label
          style={{ display: "block", marginTop: "20px", marginBottom: "5px" }}
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
              value={article?.tags}
            />
          )}
        />
        {/* PUBLISHER DATA */}
        {/* Publisher field */}
        <label style={{ display: "block", marginBottom: "5px" }}>
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
              value={article?.publisher}
              isLoading={isLoading}
              className="text-black"
            />
          )}
        />
        <textarea
          rows={3}
          cols={40}
          className="border"
          defaultValue={article?.descriptions}
          {...register("descriptions")}
        />
        <input className="btn btn-warning font-bold block cursor-pointer" type="Submit" defaultValue="SubmitandUpdate"/>
      </form>
    </div>
  );
};

export default UpdateMyArticle;
