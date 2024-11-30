import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Button } from "@mui/material";
import useAuth from "./../../hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import DescriptionModal from "../../Components/DescriptionModal";
import { FaPlus } from "react-icons/fa";
import TERModal from "../../Components/TERModal";

const MyEnrollClassDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  // console.log("class id", id);
  const { state } = useLocation();
  const classTitle = state?.title;

  const axiosSecure = useAxiosSecure();
  const { data: assignments = [] } = useQuery({
    queryKey: ["assignment", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignment/${id}`);
      return res.data;
    },
  });
  const [description, SetDescription] = useState(null);
  const {
    data: submissions = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["checkSubmit", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/checkSubmission/${user?.email}`);
      return res.data;
    },
  });

  const handleSubmit = async (assignmentId) => {
    const res = await axiosSecure.post("/submission", {
      assignmentId: assignmentId,
      email: user?.email,
      classId: id,
      status: "submitted",
    });
    if (res.data.insertedId) {
      Swal.fire({
        title: "Submitted",
        text: "Assignment submitted Successfully.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    }
  };
  return (
    <div>
      <div className="mb-3">
        <Button variant="contained">
          <label className="flex items-center gap-1" htmlFor={`modal_${id}`}>
            <FaPlus className="mr-2"></FaPlus>
            Feedback
          </label>
        </Button>

        <TERModal classTitle={classTitle} id={id}></TERModal>
      </div>
      <div>
        <h2 className="text-3xl my-3 ">{classTitle}</h2>
      </div>
      <p>Assignments : {assignments.length}</p>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, idx) => (
              <tr key={assignment._id}>
                <th>{idx + 1}</th>
                <td>{assignment.title}</td>
                <td>
                  <button
                    onClick={() => {
                      document.getElementById("my_modal_1").showModal();
                      SetDescription(assignment.description);
                    }}
                    className="btn btn-xs btn-outline rounded-sm"
                  >
                    Description
                  </button>
                  <DescriptionModal
                    description={description}
                  ></DescriptionModal>
                </td>
                <td>{assignment.deadline}</td>

                <td>
                  <Button
                    disabled={submissions.some(
                      (item) => item.assignmentId === assignment._id
                    )}
                    onClick={() => handleSubmit(assignment._id)}
                    size="small"
                  >
                    {isLoading ? "Loading" : "Submit"}
                  </Button>
                </td>
              </tr>
            ))}
            {/* row 1 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEnrollClassDetails;
