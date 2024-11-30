import { Button } from "@mui/material";
import { MdOutlineAddToPhotos } from "react-icons/md";
import AddAssignment from "./AddAssignment";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

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
    <div className="">
      <h2 className="text-3xl font-semibold mb-3">{title}</h2>
      <div className="stats shadow mb-5">
        <div className="stat place-items-center">
          <div className="stat-title">Total Enrollmemts</div>
          <div className="stat-value">{stats.enrollmentCount}</div>
          <div className="stat-desc">From January 1st to February 1st</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Assignments Count</div>
          <div className="stat-value text-secondary">
            {stats.assignmentCount}
          </div>
          <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Total assignment Count</div>
          <div className="stat-value">{stats.assignmentSubmissionCount}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
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
