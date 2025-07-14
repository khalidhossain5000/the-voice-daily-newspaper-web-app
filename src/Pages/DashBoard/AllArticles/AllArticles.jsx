import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../Shared/Loading/Loading";
import Swal from "sweetalert2";
import Modal from "react-modal";

Modal.setAppElement("#root");

const AllArticles = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [declineReason, setDeclineReason] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const openDeclineModal = (article) => {
    setSelectedArticle(article);
    setModalOpen(true);
    // document.activeElement?.blur(); // ফোকাস সরিয়ে দেয় (warning fix)
  };

  const closeDeclineModal = () => {
    setModalOpen(false);
    setSelectedArticle(null);
    setDeclineReason("");
  };

  // const {
  //   data: atricles = [],
  //   isLoading,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["articles", user?.email],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get("/articles");
  //     return res.data;
  //   },
  // });
  const {
    data = { articles: [], total: 0 },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["articles", user?.email, currentPage, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/articles?page=${currentPage}&limit=${limit}`
      );
      return res.data;
    },
  });
  const totalPages = Math.ceil(data.total / limit);

  console.log(data, "dattatat");

  if (isLoading) return <Loading />;

  //approve button
  const handleApprove = async (articleId) => {
    try {
      const res = await axiosSecure.patch(`/articles/${articleId}`, {
        status: "approved",
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Approved!", "Article has been approved.", "success");
        refetch(); // refetch article list after approval
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  //DECLINE FUNCI
  const handleDeclineSubmit = async () => {
    if (!declineReason.trim()) {
      alert("Please enter a reason.");
      return;
    }

    try {
      const res = await axiosSecure.patch(`/articles/${selectedArticle._id}`, {
        status: "declined",
        declineReason: declineReason,
      });

      if (res.data.modifiedCount > 0) {
        alert("Article declined successfully.");
        closeDeclineModal();
        refetch(); // নতুন করে data আনো
      } else {
        alert("Decline failed.");
      }
    } catch (err) {
      alert("Error occurred during decline.", err);
    }
  };

  //MAKE ARTICLE PREMIUM RELATED APIS
  const handleMakePremium = (articleId) => {
    Swal.fire({
      title: "Make this article premium?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/articles/${articleId}/premium`);
          if (res.data.modifiedCount > 0) {
            Swal.fire("Success!", "Article is now premium.", "success");
            refetch(); 
          } else {
            Swal.fire("Failed", "Could not update article.", "error");
          }
        } catch (err) {
          Swal.fire("Error!", "Something went wrong.", "error", err);
        }
      }
    });
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
            refetch(); 
          } else {
            Swal.fire("Failed!", "Could not delete the article.", "error");
          }
        } catch (err) {
          Swal.fire("Error!", "Something went wrong.", "error", err);
        }
      }
    });
  };

  return (
    <div>
      <div className="px-12 w-full lg:w-11/12 mx-auto rounded-2xl shadow-xl h-48 bg-gradient-to-tr from-[#F4F6FE] via-[#E0E2F0] to-[#D4D7E3] flex items-center justify-center relative overflow-hidden ">
        <div className="text-center px-4">
          <h1 className="text-[#211F54] text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
            All Articles
          </h1>
        </div>
        {/* Subtle overlay shapes in primary text color */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#211F54] opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#211F54] opacity-10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="p-3 lg:p-6 mt-6 shadow-2xl max-w-[1500px] mx-auto overflow-x-auto rounded-box bg-white w-full">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-3xl text-[#211f54] rancho border-b border-b-gray-300 ">
              <th className="border-r border-r-gray-300">#</th>
              <th className="border-r border-r-gray-300">Title</th>
              <th className="border-r border-r-gray-300">Author</th>
              <th className="border-r border-r-gray-300">Author Email</th>
              <th className="border-r border-r-gray-300">Author Pic</th>
              <th className="border-r border-r-gray-300">Posted Date</th>
              <th className="border-r border-r-gray-300">Status</th>
              <th className="border-r border-r-gray-300">Publisher</th>
              <th className="border-r border-r-gray-300">Is Premium</th>
              <th className="">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.articles?.map((article, i) => (
              <tr key={article._id}>
                <th className="border-r border-r-gray-300 text-[17px] urbanist font-medium text-gray-900">
                  {i + 1}
                </th>
                <td className="border-r border-r-gray-300 text-[17px] urbanist font-medium text-gray-900">
                  {article?.articleTitle}
                </td>
                <td className="border-r border-r-gray-300 text-[17px] urbanist font-medium text-gray-900">
                  {article?.authorName}
                </td>
                <td className="border-r border-r-gray-300 text-[17px] urbanist font-medium text-gray-900">
                  {article?.authorEmail}
                </td>
                <td className="border-r border-r-gray-300 text-[17px] urbanist font-medium text-gray-900">
                  {
                    <img
                      src={article?.auhtorPhoto}
                      className="w-9 h-9 rounded-full mx-auto"
                    />
                  }
                </td>
                <td className="border-r border-r-gray-300 text-[17px] urbanist font-medium text-gray-900">
                  {article?.createdAt.split("T")[0]}
                </td>
                <td
                  className={`border-r border-r-gray-300 text-[17px] urbanist font-bold ${
                    article?.status === "approved"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {article?.status}
                </td>
                <td className="border-r border-r-gray-300 text-[17px] urbanist font-medium text-gray-900">
                  {article?.publisher?.label}
                </td>
                <td>
                  {article?.isPremium ? (
                    <button className="bg-gradient-to-r from-[#211f54] via-[#3a388e] to-[#5a58c9] text-white text-xs font-bold uppercase tracking-wide px-4 py-1 lg:py-3 rounded-full shadow-md hover:scale-105 transition duration-200">
                      Premium
                    </button>
                  ) : (
                    <h2 className="text-md rancho font-bold text-gray-900 text-xl lg:text-2xl">
                      Normal
                    </h2>
                  )}
                </td>
                <td className="space-y-3">
                  <div className="flex items-center gap-6">
                    {/* <button
                      onClick={() => handleApprove(article?._id)}
                      className="btn btn-success btn-sm cursor-pointer"
                    >
                      approve
                    </button> */}
                    <button
                      onClick={() => handleApprove(article?._id)}
                      className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold uppercase px-4 py-2 rounded-full shadow-sm hover:scale-105 transition duration-200 cursor-pointer"
                    >
                      Approve
                    </button>
                    {/* <button
                      onClick={() => openDeclineModal(article)}
                      className="btn btn-error btn-sm cursor-pointer"
                    >
                      decline
                    </button> */}
                    <button
  onClick={() => openDeclineModal(article)}
  className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold uppercase px-4 py-2 rounded-full shadow-sm hover:scale-105 transition duration-200 cursor-pointer"
>
  Decline
</button>
                  </div>
                  <div className="flex items-center gap-6">
                    {/* <button
                      onClick={() => handleDelete(article._id)}
                      className="btn btn-error btn-sm cursor-pointer"
                    >
                      Delete
                    </button> */}
                    <button
  onClick={() => handleDelete(article._id)}
  className="bg-red-700 hover:bg-red-800 text-white text-xs font-semibold uppercase px-4 py-2 rounded-full shadow-sm hover:scale-105 transition duration-200 cursor-pointer"
>
  Delete
</button>

                    {/* <button
                      onClick={() => handleMakePremium(article._id)}
                      className="btn btn-warning btn-sm cursor-pointer"
                    >
                      Make Premium
                    </button> */}
                    <button
  onClick={() => handleMakePremium(article._id)}
  className="bg-gradient-to-r from-yellow-500 via-yellow-500 to-yellow-600 text-black text-xs font-bold px-4 py-1 rounded-full shadow-md hover:scale-105 transition duration-200 cursor-pointer"
>
  Make Premium
</button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-2 my-4 items-center mt-6">
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-3 py-3 rounded ${
                currentPage === number
                  ? "bg-[#211f54] text-white text-xs font-bold px-3 lg:px-6 py-1 rounded-full"
                  : "bg-gray-200"
              }`}
            >
              {number + 1}
            </button>
          ))}
          <select
            className="border p-1 rounded mb-4"
            value={limit}
            onChange={(e) => {
              setLimit(parseInt(e.target.value));
              setCurrentPage(0); // লিমিট চেঞ্জ করলে প্রথম পেজে ফিরিয়ে নাও
            }}
          >
            <option value={2}>2 per page</option>
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>
        </div>
      </div>
      <div>
        {/* MODAL */}
        <Modal
          isOpen={modalOpen}
          onRequestClose={closeDeclineModal}
          contentLabel="Decline Article"
          className="p-6 bg-white rounded shadow-lg max-w-md mx-auto mt-20"
          overlayClassName="fixed inset-0 bg-black/20 bg-opacity-40 flex justify-center items-start"
        >
          <h2 className="text-xl font-bold mb-2">
            Decline: {selectedArticle?.articleTitle}
          </h2>
          <textarea
            rows={4}
            className="textarea textarea-bordered w-full mb-4"
            placeholder="Write decline reason..."
            value={declineReason}
            onChange={(e) => setDeclineReason(e.target.value)}
          />
          <div className="flex justify-end gap-4">
            <button className="btn" onClick={closeDeclineModal}>
              Cancel
            </button>
            <button className="btn btn-error" onClick={handleDeclineSubmit}>
              Submit
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AllArticles;
