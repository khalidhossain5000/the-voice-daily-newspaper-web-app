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
    value: pub.publisherName,
    label: pub.publisherName,
  }));


  const publisherValue = selectedPublisher?.value || "";
  const tagsValue = selectedTags.map((tag) => tag.value).join(",");
  console.log('pub and tag val',publisherValue,tagsValue);
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
    <div>
      <div className="serch w-64 mx-auto py-12">
        <input
          type="text"
          
          placeholder="Search articles by title"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="input input-bordered w-full max-w-md mb-4"
        />
        {/* Publisher Single Select */}
        <Select
          options={publisherOptions}
          value={selectedPublisher}
          onChange={setSelectedPublisher}
          placeholder="Select Publisher"
          isClearable
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
        />
      </div>

      {atricles.length === 0 ? (
        <p className="text-center text-lg text-gray-500 py-10">
          No articles found matching your search/filter.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto py-24 gap-6">
          {atricles.map((article) => (
            <ArticelsCard key={article._id} article={article}></ArticelsCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicAllArticles;
