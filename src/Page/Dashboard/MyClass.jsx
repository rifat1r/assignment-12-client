import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IconButton } from "@mui/material";
import Swal from "sweetalert2";
import UpdateClass from "./UpdateClass";
import { useState } from "react";
import { Link } from "react-router-dom";

const MyClass = () => {
  const [id, setId] = useState(null);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: myClass = [], refetch } = useQuery({
    queryKey: ["myClass", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${user?.email}`);
      console.log("my class", myClass);
      return res.data;
    },
  });
  const handleDelete = async (aClass) => {
    console.log(aClass._id);
    Swal.fire({
      title: "Are you sure?",
      text: `Are you sure you want to delete ${aClass.title}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/class/${aClass._id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your class has been deleted.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  return (
    <div>
      <h2>My Class : {myClass.length}</h2>
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-5">
        {myClass.map((aClass) => (
          <div
            key={aClass._id}
            className="card card-compact  w-96 rounded-md shadow-2xl border"
          >
            <div className="flex items-center  gap-3 p-4">
              <div className="avatar">
                <div className="mask mask-circle h-14 w-14">
                  <img
                    src={aClass?.teacherImg}
                    onError={(e) => {
                      e.target.src =
                        "https://i.ibb.co.com/VWLjs5S/453178253-471506465671661-2781666950760530985-n.png";
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-16 ">
                <div>
                  <div className="font-bold">{aClass.name}</div>
                  <div className="text-sm opacity-50">{aClass.email}</div>
                </div>
                <div className="badge p-4 uppercase border-2">
                  {aClass.status ? aClass.status : "pending"}
                </div>
              </div>
            </div>
            <figure>
              <img className="h-56 w-full object-cover" src={aClass.image} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{aClass.title}</h2>
              <p className="text-lg text-blue-500">Price : ${aClass.price}</p>
              <div className="flex justify-between items-center">
                <div className="flex gap-3 text-xl">
                  <IconButton
                    onClick={() => {
                      document.getElementById("my_modal_4").showModal();
                      setId(aClass._id);
                    }}
                  >
                    <FaEdit className="text-3xl text-blue-500"></FaEdit>
                  </IconButton>
                  <UpdateClass
                    id={id}
                    refetch={refetch}
                    aClass={aClass}
                  ></UpdateClass>
                  <IconButton onClick={() => handleDelete(aClass)}>
                    <FaTrash className="text-orange-500"></FaTrash>
                  </IconButton>
                </div>
                <Link
                  state={{ title: aClass.title }}
                  to={`/dashboard/myClass/${aClass._id}`}
                >
                  <button
                    disabled={aClass.status !== "approved"}
                    className="btn btn-outline btn-sm rounded-md border-blue-500 text-blue-500"
                  >
                    See Details
                  </button>
                </Link>
              </div>
            </div>

            <div tabIndex={0} className="collapse collapse-arrow ">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                DESCRIPTION
              </div>
              <div className="collapse-content">
                <p>{aClass.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClass;
