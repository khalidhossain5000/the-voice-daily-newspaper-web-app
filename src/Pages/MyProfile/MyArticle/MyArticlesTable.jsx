import React from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";

const MyArticlesTable = ({ myArticle, serial, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const handleArticleUpdate = (e) => {
    e.preventDefault();
  };

  //ARTICLE DELETE REALTED API
  const handleDelete = (articleId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/articles/${articleId}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "The article has been deleted.", "success");
            refetch(); // নতুন করে ডেটা আনো
          } else {
            Swal.fire("Failed!", "Could not delete the article.", "error");
          }
        } catch (err) {
          Swal.fire("Error!", "Something went wrong.", "error", err);
        }
      }
    });
  };
  const {
    articleTitle,
    status,
    isPremium,
  } = myArticle;
  // console.log(myArticle);
  return (
    <tr>
      <th>{serial + 1}</th>
      <td className="line-clamp-2">
        {articleTitle.split(" ").slice(0, 15).join(" ")}.......
      </td>
      <td>
        <Link
          to={`/article/${myArticle._id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Details
        </Link>
      </td>
      <td>{status}</td>
      
      <td>
        {isPremium ? (
          <button className="btn btn-sm btn-info font-bold text-black">
            Premium
          </button>
        ) : (
          "Normal"
        )}
      </td>
      <td className="space-y-3">
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleArticleUpdate(myArticle)}
            className="btn btn-error btn-sm cursor-pointer"
          >
            Update Article
          </button>

          <button
            onClick={() => handleDelete(myArticle._id)}
            className="btn btn-error btn-sm cursor-pointer"
          >
            Delete Article
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MyArticlesTable;
