import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Button } from "@mui/material";
import DescriptionModal from "../../Components/DescriptionModal";
import Swal from "sweetalert2";
import Status from "../../Components/Status";

const AllClass = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allClass = [], refetch } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/class");
      return res.data;
    },
  });

  const handleApprove = async (aClass) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Are you sure you want to approve ${aClass.title}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!",
    }).then(async (result) => {
      const res = await axiosSecure.patch(`/class/approve/${aClass._id}`);
      console.log(res.data);
      if (result.isConfirmed) {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Appproved!",
            text: "The request have been Approved.",
            icon: "success",
          });
        }
      }
    });
  };
  const handleReject = async (aClass) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Are you sure you want to Reject ${aClass.title}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    }).then(async (result) => {
      const res = await axiosSecure.patch(`/class/reject/${aClass._id}`);
      console.log(res.data);
      if (result.isConfirmed) {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Appproved!",
            text: "The request have been Reject.",
            icon: "success",
          });
        }
      }
    });
  };
  return (
    <div className="overflow-x-auto">
      <table className="table table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th>#</th>
            <td>Image</td>
            <td>Title</td>
            <td>Email</td>
            <td>Description</td>
            <td>Status</td>
            <td>Approve</td>
            <td>Reject</td>
            <th>See Progress</th>
          </tr>
        </thead>
        <tbody>
          {allClass.map((aClass, idx) => (
            <tr key={aClass._id}>
              <th>{idx + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={aClass.image} />
                    </div>
                  </div>
                </div>
              </td>
              <td>{aClass.title}</td>
              <td>{aClass.email}</td>
              <td>
                <Button
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                  size="small"
                >
                  Description
                </Button>
                <DescriptionModal
                  description={aClass.description}
                ></DescriptionModal>
              </td>
              <td>
                <Status status={aClass.status}></Status>
              </td>
              <td>
                <Button
                  onClick={() => handleApprove(aClass)}
                  variant="outlined"
                  size="small"
                  disabled={
                    aClass.status === "approved" || aClass.status === "rejected"
                  }
                >
                  Approve
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => handleReject(aClass)}
                  variant="contained"
                  size="small"
                  color="blue"
                  disabled={
                    aClass.status === "approved" || aClass.status === "rejected"
                  }
                >
                  Reject
                </Button>
              </td>
              <th>
                <Button
                  disabled={aClass.status !== "approved"}
                  variant="contained"
                  size="small"
                >
                  See Progress
                </Button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllClass;
