// import { Button } from "@mui/material";
// import useAxiosSecure from "../hooks/useAxiosSecure";
// import useAuth from "../hooks/useAuth";
// import Swal from "sweetalert2";
// import useCheckSubmission from "../hooks/useCheckSubmission";
// import { useEffect } from "react";

// const SubmitButton = ({ id }) => {
//   const { status, checkSubmission } = useCheckSubmission();

//   const axiosSecure = useAxiosSecure();
//   const handleSubmit = async (id) => {
//     const res = await axiosSecure.post("/submission", {
//       assignmentId: id,
//       email: user?.email,
//       status: "submitted",
//     });
//     if (res.data.insertedId) {
//       Swal.fire({
//         title: "Submitted",
//         text: "Assignment submitted Successfully.",
//         icon: "success",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       await checkSubmission(id);
//     }
//   };
//   return (
//     <td>
//       <Button
//         disabled={status === true}
//         onClick={() => handleSubmit(id)}
//         size="small"
//       >
//         Submit
//       </Button>
//     </td>
//   );
// };

// export default SubmitButton;
