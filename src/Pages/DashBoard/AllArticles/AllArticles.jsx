import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../Shared/Loading/Loading";
import Swal from 'sweetalert2'


const AllArticles = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: atricles = [], isLoading,refetch } = useQuery({
    queryKey: ["articles", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles");
      return res.data;
    },
  });
  if (isLoading) return <Loading />;
  console.log(atricles);
  //approve button
  const handleApprove = async (articleId) => {
  try {
    const res = await axiosSecure.patch(`/articles/${articleId}`, {
      status: "approved"
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
             
             {
                atricles.map((article,i)=><tr
                key={article._id}
                >
                <th>{i+1}</th>
                <td>{article?.articleTitle}</td>
                <td>{article?.authorName}</td>
                <td>{article?.authorEmail}</td>
                <td>{<img src={article?.auhtorPhoto} className="w-9 h-9 rounded-full"/>}</td>
                <td>{article?.createdAt.split('T')[0]}</td>
                <td>{article?.status}</td>
                <td>{article?.publisher?.label}</td>
                <td className="space-y-3">
                    <div className="flex items-center gap-6">
                        <button onClick={()=>handleApprove(article?._id)} className="btn btn-success btn-sm cursor-pointer">approve</button>
                        <button className="btn btn-error btn-sm cursor-pointer">decline</button>
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="btn btn-error btn-sm cursor-pointer">Delete</button>
                        <button className="btn btn-warning btn-sm cursor-pointer">Make Premium</button>
                    </div>
                    
                </td>
              </tr>)
             }
              
             
            </tbody>
          </table>
        </div>
      
    </div>
  );
};

export default AllArticles;
