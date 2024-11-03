import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Button } from "@mui/material";
import useAuth from "./../../hooks/useAuth";
import Swal from "sweetalert2";

const MyEnrollClassDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: assignments = [] } = useQuery({
    queryKey: ["assignment", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignment/${id}`);
      return res.data;
    },
  });
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

  const handleSubmit = async (id) => {
    const res = await axiosSecure.post("/submission", {
      assignmentId: id,
      email: user?.email,
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
                  <button className="btn btn-xs btn-outline rounded-sm">
                    Description
                  </button>
                </td>
                <td>{assignment.deadline}</td>

                <td>
                  <Button
                    disabled={submissions.find(
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
