import React, { useState } from "react";
import Select from "react-select";
import { tagOptions } from "../AddArticle/Data/TagOptions";
import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Loading from "../Shared/Loading/Loading";
import ArticelsCard from "./ArticelsCard";

const PublicAllArticles = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "white",
      borderRadius: "0.5rem", // rounded-lg
      borderColor: state.isFocused ? "#211f54" : "#d1d5db", // ফোকাসে primary color
      boxShadow: state.isFocused ? "0 0 0 2px rgba(33,31,84,0.4)" : "none", // হালকা glow
      padding: "4px 8px",
      cursor: "pointer",
      transition: "all 0.2s ease",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#6b7280", // gray-500
      fontWeight: 500,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#211f54",
      fontWeight: 600,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#211f54",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "#211f54",
    }),
  };

  //getting publisher data from db
  const { data: publishers = [], isLoading: publisherLoading } = useQuery({
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
console.log("publisher",publishers);
  const publisherValue = selectedPublisher?.value || "";
  const tagsValue = selectedTags.map((tag) => tag.value).join(",");
  console.log("pub and tag val", publisherValue, tagsValue,'selctd publisher',selectedPublisher);
  //ARTICLES DATA LOADING IS RELATED ---->
  const { data: atricles = [], isLoading } = useQuery({
    queryKey: [
      "articles",
      user?.email,
      searchText,
      selectedPublisher,
      selectedTags,
    ],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles/approved", {
        params: {
          search: searchText,
          publisher: publisherValue,
          tags: tagsValue, // array থেকে comma separated string
        },
      });
      return res.data;
    },
  });

  if (isLoading || publisherLoading) return <Loading />;
  return (
    <div className="bg-[#e8efef]">
      <h1 className="text-center text-3xl lg:text-5xl font-bold text-[#211f54] py-12 ">
        All Articles
      </h1>
      <div className="serch w-96 mx-auto py-12">
        <input
          type="text"
          placeholder="Search articles by title"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="input input-bordered w-full max-w-md mb-4"
        />

        <div className="flex max-w-md w-full mb-4 rounded-lg overflow-hidden border border-gray-300 shadow-md">
          <input
            type="text"
            placeholder="Search articles by title"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-grow px-4 py-3 text-gray-900 placeholder-gray-400 
               focus:outline-cyan-200 "
          />
          <button className="bg-[#211f54] hover:bg-[#1a1b4b] text-white font-semibold px-6 py-3 transition-colors duration-300">
            Search
          </button>
        </div>

        {/* Publisher Single Select */}
        {/* <Select
          options={publisherOptions}
          value={selectedPublisher}
          onChange={setSelectedPublisher}
          placeholder="Select Publisher"
          isClearable
          className="mb-4"
        /> */}
        <Select
          options={publisherOptions}
          value={selectedPublisher}
          onChange={setSelectedPublisher}
          placeholder="Select Publisher"
          isClearable
          styles={customStyles}
          className="mb-4"
        />
        {/* Tags Multi Select */}
        <Select
          options={tagOptions}
          value={selectedTags}
          onChange={setSelectedTags}
          isMulti
          placeholder="Select Tags"
          className="mb-4"
          styles={customStyles}
        />
      </div>

      {atricles.length === 0 ? (
        <p className="text-center text-lg text-gray-500 py-10">
          No articles found matching your search/filter.
        </p>
      ) : (
        <div className=" grid grid-cols-1 md:grid-cols- lg:grid-cols-4 lg:max-w-full max-w-7xl lg:px-22 px-3 mx-auto py-24 gap-6">
          {atricles.map((article) => (
            <ArticelsCard key={article._id} article={article}></ArticelsCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicAllArticles;
