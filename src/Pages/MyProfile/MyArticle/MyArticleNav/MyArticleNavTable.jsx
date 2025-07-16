import React, { useState } from "react";
import Swal from "sweetalert2";

import { Link } from "react-router";
import Modal from "react-modal";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
Modal.setAppElement("#root");

const MyArticleNavTable = ({ myArticle, serial, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const openModal = (reason) => {
    setDeclineReason(reason);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setDeclineReason("");
  };
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
      buttonsStyling: false,
      color:'black',
      customClass: {
        popup: "error-gradient-bg",
        confirmButton:
          "bg-gradient-to-r from-yellow-500 text-black  to-amber-600 hover:bg-red-200  text-black font-semibold px-6 py-2 rounded-sm shadow-md  cursor-pointer",
        cancelButton:
          "bg-yellow-600 ml-3 text-xl text-black cursor-pointer hover:bg-yellow-500 font-bold px-6 py-2 rounded-xl",
      },

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
  const { articleTitle, isPremium } = myArticle;
  // console.log(myArticle);
  return (
    <tr>
      <th>{serial + 1}</th>
      <td className="line-clamp-2">
        {/* {articleTitle.split(" ").slice(0, 15).join(" ")}....... */}
        {articleTitle}
      </td>
      <td>
        {/* <Link
          to={`/article/${myArticle._id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Details
        </Link> */}
        <Link
          to={`/article/${myArticle._id}`}
          className="relative inline-block px-6 py-2 font-semibold text-white group"
        >
          <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-blue-700 group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-lg"></span>
          <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg group-hover:shadow-xl transition duration-300 ease-out"></span>
          <span className="relative">Details</span>
        </Link>
      </td>
      
        {/* {myArticle.status === "declined" ? (
          <>
            <span className="text-red-600 font-semibold">Declined</span>
            <button
              onClick={() => openModal(myArticle?.declineReason)}
              className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
            >
              Reason
            </button>
          </>
        ) : (
          <span className="capitalize">{myArticle?.status}</span>
        )} */}

        <td className="py-4">
          {myArticle.status === "declined" ? (
            <div className="flex items-center gap-3">
              <span className="bg-red-200 text-red-800 text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
                Declined
              </span>

              <button
                onClick={() => openModal(myArticle?.declineReason)}
                className="cursor-pointer relative inline-flex items-center justify-center overflow-hidden rounded-full px-4 py-[6px] text-sm font-medium text-blue-600 border border-blue-600 group hover:text-white transition-all duration-200"
              >
                <span className="absolute inset-0 bg-blue-600 transition-all duration-300 ease-out transform scale-x-0 group-hover:scale-x-100 origin-left rounded-full"></span>
                <span className="relative z-10">View Reason</span>
              </button>
            </div>
          ) : (
            <span
              className={`capitalize px-3 py-1 rounded-full text-sm font-semibold
        ${
          myArticle.status === "pending"
            ? "bg-yellow-100 text-yellow-800"
            : myArticle.status === "approved"
            ? "bg-green-100 text-green-700"
            : "bg-gray-200 text-gray-700"
        }`}
            >
              {myArticle?.status}
            </span>
          )}
        </td>
      

      <td>
        {isPremium ? (
          <span className="inline-block px-4 py-[6px] text-sm font-semibold text-black bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
            Premium
          </span>
        ) : (
          <span className="text-sm font-medium text-red-600">No</span>
        )}
      </td>
      <td className="space-y-3">
        <div className="flex items-center gap-6">
          {/* <Link
            to={`/my-profile/update-my-article/${myArticle._id}`}
            onClick={() => handleArticleUpdate(myArticle)}
            className="btn btn-error btn-sm cursor-pointer"
          >
            Update Article
          </Link> */}
          <Link
            to={`/my-profile/update-my-article/${myArticle._id}`}
            onClick={() => handleArticleUpdate(myArticle)}
            className="
    inline-flex items-center whitespace-nowrap
    px-5 py-2 text-sm font-semibold
    text-[#16b7cc] border-2 border-[#16b7cc]
    rounded-full
    transition-all duration-200
    hover:bg-[#16b7cc] hover:text-white
    hover:shadow-lg hover:-translate-y-0.5
  "
          >
            Update Article
          </Link>

          {/* <button
            onClick={() => handleDelete(myArticle._id)}
            className="btn btn-error btn-sm cursor-pointer"
          >
            Delete Article
          </button> */}

          <button
            onClick={() => handleDelete(myArticle._id)}
            className="whitespace-nowrap inline-block px-6 py-2 bg-[#211f54] text-white font-medium rounded-md transition-transform duration-500 ease-out hover:bg-red-600 cursor-pointer hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16b7cc]"
          >
            Delete Article
          </button>
        </div>
      </td>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Decline Reason Modal"
        className="bg-white p-6 max-w-md mx-auto mt-20 rounded shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black/20 bg-opacity-50 flex justify-center items-start z-50"
      >
        <h2 className="text-lg font-bold mb-4 text-red-600">Decline Reason</h2>
        <p className="mb-6">{declineReason || "No reason provided."}</p>
        <button
          onClick={closeModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </Modal>
    </tr>
  );
};

export default MyArticleNavTable;
