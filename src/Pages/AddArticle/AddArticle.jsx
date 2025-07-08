import React, { useState } from "react";
import { useForm ,Controller } from "react-hook-form";
import Select from "react-select";
import {tagOptions} from "./Data/TagOptions"
import axios from "axios";
const AddArticle = () => {
    const [articlePic,setArticlePic]=useState('')
  const {
    register,
    handleSubmit,
    control
    // formState: { errors },
  } = useForm({
    defaultValues: {
      publisher: null,
      tags: [],
    },
  });

  const onSubmit = (data) => {
    console.log("this is data",data);
  };
  
  //iamge
  const handleImageUpload = async(e) => {
    const image=e.target.files[0]
    

    const formData=new FormData()
    formData.append('image',image)
    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_Imgbb_Key
    }`;

    const res=await axios.post(imagUploadUrl,formData)
    setArticlePic(res.data.data.display_url);

  };


  return (
    <div className="max-w-7xl mx-auto py-12 lg:py-24">
      <h1>Add Article</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Article Title" {...register('articleTitle')} />
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
      <label style={{ display: "block", marginTop: "20px", marginBottom: "5px" }}>Tags</label>
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
          />
        )}
      />
        {/* PUBLISHER DATA */}
           {/* Publisher field */}
      <label style={{ display: "block", marginBottom: "5px" }}>Publisher</label>
      <Controller
        name="publisher"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={tagOptions}
            placeholder="Select Publisher"
            onChange={(selectedOption) => field.onChange(selectedOption)}
            value={field.value}
          />
        )}
      />
        <textarea rows={3} cols={40} className="border" {...register('descriptions')} />
        <input className="btn btn-error block cursor-pointer" type="submit" />
      </form>
    </div>
  );
};

export default AddArticle;
