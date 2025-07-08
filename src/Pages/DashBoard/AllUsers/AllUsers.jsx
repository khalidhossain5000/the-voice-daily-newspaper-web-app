import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  //FETCH ALL USERS
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

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
            {users.map((user, i) => (
              <tr key={i}>
                <th>{i+1}</th>
                <td><img src={user?.profilePic} alt="" className="w-12 h-12 rounded-full"/></td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <td>
                    {
                        user?.role ==='admin' ? <span className="text-green-500 font-semibold">Admin</span> : <button onClick={()=>{handleMakeAdmin(user?._id)}} className="btn btn-sm btn-outline btn-primary">Make Admin</button>
                    }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
