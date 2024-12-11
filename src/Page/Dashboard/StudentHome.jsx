import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { MdPendingActions } from "react-icons/md";
import { AiOutlineFileText } from "react-icons/ai";
import { BiBookAlt, BiCommentDots } from "react-icons/bi";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const StudentHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: studentStats = {}, isPending: loading } = useQuery({
    queryKey: [user.email, "student-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/student-home/${user.email}`);
      return res.data;
    },
  });

  const assignmentCount = (studentStats.stats || []).reduce(
    (sum, assignment) => sum + assignment.assignmentCount,
    0
  );
  const submissionCount = (studentStats.stats || []).reduce(
    (sum, assignment) => sum + assignment.submissionCount,
    0
  );
  console.log(assignmentCount);
  if (loading) {
    return (
      <div className="flex justify-center mt-36">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="max-w-6xl">
      <h2 className="text-3xl font-bold">Welcome back, {user.displayName}</h2>
      <div className="space-x-3 space-y-2">
        <div className="stats shadow bg-blue-400 bg-opacity-20">
          <div className="stat flex  items-center">
            <div>
              <div className="stat-title">Enrollments</div>
              <div className="stat-value">{studentStats.enrollmentCount}</div>
            </div>
            <BiBookAlt className="text-4xl text-blue-400" />
          </div>
        </div>{" "}
        <div className="stats shadow bg-sky-400 bg-opacity-20">
          <div className="stat flex  items-center">
            <div>
              <div className="stat-title"> Assignments</div>
              <div className="stat-value">{assignmentCount}</div>
            </div>
            <AiOutlineFileText className="text-4xl text-sky-400" />
          </div>
        </div>{" "}
        <div className="stats shadow bg-orange-400 bg-opacity-20">
          <div className="stat flex  items-center">
            <div>
              <div className="stat-title">Pending assignment</div>

              <div className="stat-value">
                {assignmentCount - submissionCount}
              </div>
            </div>
            <MdPendingActions className="text-4xl text-orange-400" />
          </div>
        </div>
        <div className="stats shadow bg-violet-400 bg-opacity-20">
          <div className="stat flex  items-center">
            <div>
              <div className="stat-title">Feedback </div>
              <div className="stat-value">{studentStats.feedbackCount}</div>
            </div>
            <BiCommentDots className="text-4xl text-violet-400" />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table  table-pin-rows table-pin-cols table-xs">
          <caption className="text-2xl font-semibold my-3">
            Class Performance Overview
          </caption>
          <thead className="bg-gray-200 font-bold">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Teacher</th>
              <th>Assignmens</th>
              <th>Submission rate</th>
              <th>Action</th>
            </tr>
          </thead>
          {studentStats.stats.map((aClass, idx) => (
            <tbody key={aClass._id}>
              {/* row 1 */}
              <tr>
                <th>{idx + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-14 w-14">
                        <img src={aClass.image} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{aClass.title}</td>
                <td>{aClass.teacherName}</td>
                <td>{aClass.assignmentCount}</td>
                <td>
                  {/* <span>{aClass.submissionCount / aClass.assignmentCount}</span> */}
                  <span>
                    {aClass.submissionCount}/{aClass.assignmentCount}
                  </span>
                  <br />
                  <progress
                    className="progress progress-info  w-32"
                    value={
                      (aClass.submissionCount / aClass.assignmentCount) * 100
                    }
                    max="100"
                  ></progress>
                </td>
                <td>
                  <Link
                    state={{ title: aClass.title }}
                    to={`/dashboard/myEnrollClassDetails/${aClass.classId}`}
                  >
                    <Button size="small" variant="outlined">
                      View Class
                    </Button>
                  </Link>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default StudentHome;
