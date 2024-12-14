import { Button } from "@mui/material";
import { MdOutlineAddToPhotos } from "react-icons/md";
import AddAssignment from "./AddAssignment";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { HiDocumentText } from "react-icons/hi";
import {
  FaChalkboardTeacher,
  FaCheckCircle,
  FaUserFriends,
} from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { AiOutlineUpload } from "react-icons/ai";

const MyClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: stats = {}, refetch } = useQuery({
    queryKey: ["teacher-stats", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacher-stats/${id}`);
      return res.data;
    },
  });
  const { state } = useLocation();
  const title = state.title;
  // console.log("state", state);
  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-3">{title}</h2>
      <div className="flex flex-wrap  items-center gap-6 mb-6">
        <div className="flex items-center justify-center gap-2 bg-amber-400 bg-opacity-25 py-2 px-3 rounded-lg shadow">
          <FiCheckCircle className="text-4xl text-amber-400" />
          <div>
            <h1 className="text-2xl font-bold">{stats.enrollmentCount}+</h1>
            <h2 className=" font-medium">Total Enrollments</h2>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 bg-sky-400 bg-opacity-25 py-2 px-3 rounded-lg shadow">
          <HiDocumentText className="text-4xl text-sky-400" />
          <div>
            <h1 className="text-2xl font-bold">{stats.assignmentCount}+</h1>
            <h2 className=" font-medium">Total Assignments</h2>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 bg-violet-400 bg-opacity-25 py-2 px-3 rounded-lg shadow">
          <AiOutlineUpload className="text-4xl text-violet-400" />
          <div>
            <h1 className="text-2xl font-bold">
              {stats.assignmentSubmissionCount}+
            </h1>
            <h2 className=" font-medium"> Assignment Submissions</h2>
          </div>
        </div>
      </div>
      {/*  */}

      <div>
        <Button
          variant="contained"
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          <MdOutlineAddToPhotos className="mr-2 text-xl" />
          Create{" "}
        </Button>
      </div>
      <AddAssignment
        title={title}
        refetch={refetch}
        classId={id}
      ></AddAssignment>
    </div>
  );
};

export default MyClassDetails;
