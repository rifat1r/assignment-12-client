import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Status from "../../Components/Status";

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allTeacherRequest = [], refetch } = useQuery({
    queryKey: ["teacherRequest"],
    queryFn: async () => {
      const res = await axiosSecure.get("/teacherRequest");
      return res.data;
    },
  });
  const handleReject = (request) => {
    console.log(request);
    Swal.fire({
      title: `Are you sure you want to reject ${request.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(
          `/teacherRequest/reject/${request._id}`
        );
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            icon: "success",
            title: "Request rejected",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  const handleApprove = (request) => {
    console.log(request);
    Swal.fire({
      title: `Are you sure you want approve ${request.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(
          `/teacherRequest/approve/${request._id}`
        );
        console.log("from approve", res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            icon: "success",
            title: "Request approved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };
  return (
    <div className="max-w-7xl">
      <div className="overflow-x-auto">
        <table className="table table-xs table-pin-rows table-pin-cols">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Title</th>
              <th>Experience</th>
              <th>Category</th>
              <th>Status</th>
              <th>Approve</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allTeacherRequest.map((request, idx) => (
              <tr key={request._id}>
                <th>{idx + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-10 w-10">
                        <img src={request.image} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{request.name}</td>
                <td>{request.email}</td>

                <td>{request.title}</td>
                <td>{request.experience}</td>
                <td>{request.category}</td>

                <td>
                  <Status status={request.status}></Status>
                </td>
                <td>
                  <button
                    disabled={request.status}
                    onClick={() => handleApprove(request)}
                    className="btn btn-sm"
                  >
                    Approve
                  </button>
                </td>
                <td>
                  <button
                    disabled={request.status}
                    onClick={() => handleReject(request)}
                    className="btn btn-sm"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherRequest;
