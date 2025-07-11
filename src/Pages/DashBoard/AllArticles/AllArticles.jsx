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

  const {
    data: atricles = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["articles", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles");
      return res.data;
    },
  });
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
    title: 'Make this article premium?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'Cancel',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/articles/${articleId}/premium`);
        if (res.data.modifiedCount > 0) {
          Swal.fire('Success!', 'Article is now premium.', 'success');
          refetch(); // রিফ্রেশ করলে নতুন data আসবে
        } else {
          Swal.fire('Failed', 'Could not update article.', 'error');
        }
      } catch (err) {
        Swal.fire('Error!', 'Something went wrong.', 'error',err);
      }
    }
  });
};
//ARTICLE DELETE REALTED API
const handleDelete = (articleId) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/articles/${articleId}`);
        if (res.data.deletedCount > 0) {
          Swal.fire('Deleted!', 'The article has been deleted.', 'success');
          refetch(); // নতুন করে ডেটা আনো
        } else {
          Swal.fire('Failed!', 'Could not delete the article.', 'error');
        }
      } catch (err) {
        Swal.fire('Error!', 'Something went wrong.', 'error',err);
      }
    }
  });
};

  return (
    <div>
      <h2>All Articles</h2>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-full">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Author Email</th>
              <th>Author Pic</th>
              <th>Posted Date</th>
              <th>Status</th>
              <th>Publisher</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {atricles.map((article, i) => (
              <tr key={article._id}>
                <th>{i + 1}</th>
                <td>{article?.articleTitle}</td>
                <td>{article?.authorName}</td>
                <td>{article?.authorEmail}</td>
                <td>
                  {
                    <img
                      src={article?.auhtorPhoto}
                      className="w-9 h-9 rounded-full"
                    />
                  }
                </td>
                <td>{article?.createdAt.split("T")[0]}</td>
                <td>{article?.status}</td>
                <td>{article?.publisher?.label}</td>
                <td className="space-y-3">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => handleApprove(article?._id)}
                      className="btn btn-success btn-sm cursor-pointer"
                    >
                      approve
                    </button>
                    <button
                      onClick={() => openDeclineModal(article)}
                      className="btn btn-error btn-sm cursor-pointer"
                    >
                      decline
                    </button>
                  </div>
                  <div className="flex items-center gap-6">
                    <button onClick={()=>handleDelete(article._id)} className="btn btn-error btn-sm cursor-pointer">
                      Delete
                    </button>
                    <button onClick={() => handleMakePremium(article._id)} className="btn btn-warning btn-sm cursor-pointer">
                      Make Premium
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
