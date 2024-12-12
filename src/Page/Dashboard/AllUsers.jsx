import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTrash, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { IconButton } from "@mui/material";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";

const AllUsers = () => {
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
    console.log("search", search);
  };
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["allUsers", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}`);
      return res.data;
    },
  });
  const { data: teacherStatus = [] } = useQuery({
    queryKey: ["teachersStatus"],
    queryFn: async () => {
      const res = await axiosSecure.get("/teachersStatus");
      return res.data;
    },
  });
  const { data: adminStatus = [], refetch: adminStatusRefetch } = useQuery({
    queryKey: ["adminStatus"],
    queryFn: async () => {
      const res = await axiosSecure.get("/adminStatus");
      return res.data;
    },
  });
  const handleDelete = (user) => {
    Swal.fire({
      title: `Are you sure you want to delete ${user.name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/users/${user._id}`);
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: `${user.name} is deleted  Successfully`,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };
  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Are you sure you want to make ${user.name} admin`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`users/${user._id}`);
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          adminStatusRefetch();
          refetch();
          Swal.fire({
            title: `${user.name} is Admin now`,
            text: `${user.name} is deleted  Successfully`,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };
  return (
    <div className="overflow-x-auto max-w-7xl z-20">
      <div className="flex justify-start mb-6">
        <form onSubmit={handleSearch}>
          <label className="input input-bordered  rounded-none flex items-center gap-2 max-w-lg">
            <input
              type="text"
              name="search"
              className="grown "
              placeholder="Search for user"
            />
            <IoSearch className="text-2xl " />
          </label>
        </form>
      </div>
      <table className="table table-zebra table-xs table-pin-rows table-pin-cols">
        {/* head */}
        <thead>
          <tr className="bg-base-200">
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Make Admin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user._id}>
              <td>{idx + 1}</td>
              <td>
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src={
                        user?.image
                          ? user.image
                          : "https://i.ibb.co.com/VWLjs5S/453178253-471506465671661-2781666950760530985-n.png"
                      }
                    />
                  </div>
                </div>
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="">
                {user.role === "admin" ? (
                  <span>Admin</span>
                ) : teacherStatus?.some(
                    (teacher) => teacher.email === user?.email
                  ) ? (
                  <span>Teacher </span>
                ) : (
                  <span>User</span>
                )}
              </td>
              <td>
                <IconButton
                  disabled={adminStatus?.some(
                    (admin) => admin.email === user.email
                  )}
                >
                  <FaUsers
                    onClick={() => handleMakeAdmin(user)}
                    className="text-xl"
                  ></FaUsers>
                </IconButton>
              </td>
              <td>
                <IconButton>
                  <FaTrash
                    onClick={() => handleDelete(user)}
                    className="text-red-400 text-lg"
                  />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
