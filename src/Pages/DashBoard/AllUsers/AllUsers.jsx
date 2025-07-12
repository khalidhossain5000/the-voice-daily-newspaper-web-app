import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(0); // 0-based index
  const [limit, setLimit] = useState(10); // প্রতি পেজে কতজন

  //FETCH ALL USERS
  const {
    data = { users: [], total: 0 },
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", currentPage, limit], // 🧠 dynamic key
    queryFn: async () => {
      // const res = await axiosSecure.get("/users");
      const res = await axiosSecure.get(
        `/users?page=${currentPage}&limit=${limit}`
      );
      return res.data;
    },
  });
  const totalPages = Math.ceil(data.total / limit);
  const handleMakeAdmin = async (id) => {
    console.log(id);
    try {
      await axiosSecure.patch(`/users/admin/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <Loading />;
  return (
    <div>
      <h2>All Users</h2>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data.users.map((user, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>
                  <img
                    src={user?.profilePic}
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <td>
                  {user?.role === "admin" ? (
                    <span className="text-green-500 font-semibold">Admin</span>
                  ) : (
                    <button
                      onClick={() => {
                        handleMakeAdmin(user?._id);
                      }}
                      className="btn btn-sm btn-outline btn-primary"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-2 mt-4">
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-3 py-1 rounded ${
                currentPage === number
                  ? "bg-blue-600 text-white"
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
    </div>
  );
};

export default AllUsers;
