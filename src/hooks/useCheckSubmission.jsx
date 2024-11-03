import { useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCheckSubmission = () => {
  // const [status, setStatus] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Function to check the submission
  const checkSubmission = async (id) => {
    try {
      console.log("assignment id", id);
      const res = await axiosSecure.post("/checkSubmission", {
        assignmentId: id,
        email: user?.email,
      });
      return res.data;
      // setStatus(res.data);
    } catch (error) {
      console.error("Error checking submission:", error);
    }
  };

  return checkSubmission;
};

export default useCheckSubmission;
