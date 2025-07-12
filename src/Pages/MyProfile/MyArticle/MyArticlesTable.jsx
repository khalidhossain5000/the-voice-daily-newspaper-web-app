import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import Modal from "react-modal";
Modal.setAppElement("#root");
const MyArticlesTable = ({ myArticle, serial, refetch }) => {
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
      <td>
        {myArticle.status === "declined" ? (
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
        )}
      </td>

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

export default MyArticlesTable;
