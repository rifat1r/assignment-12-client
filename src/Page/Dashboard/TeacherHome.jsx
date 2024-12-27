import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FaUserGraduate } from "react-icons/fa6";
import { FiUserPlus } from "react-icons/fi";
import { MdClass } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";

const TeacherHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: stats = {}, isPending: loading } = useQuery({
    queryKey: ["teacher-home", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacher-home/${user.email}`);
      return res.data;
    },
  });
  // console.log(stats);
  if (loading) {
    return (
      <div className="flex justify-center mt-36">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="p-4 max-w-7xl">
      <h2 className="text-3xl font-bold mb-5">
        Welcome back, {user.displayName}
      </h2>
      <div className="space-x-3 space-y-2">
        <div className="stats shadow bg-blue-400 bg-opacity-20">
          <div className="stat flex  items-center">
            <div>
              <div className="stat-title">Enrollments</div>
              <div className="stat-value">{stats.enrollmetCount}</div>
            </div>
            <FiUserPlus className="text-4xl text-blue-400" />
          </div>
        </div>
        <div className="stats shadow bg-violet-400 bg-opacity-20">
          <div className="stat flex  items-center">
            <div>
              <div className="stat-title">Students</div>
              <div className="stat-value">{stats.StudentCount}</div>
            </div>
            <FaUserGraduate className="text-4xl text-violet-400" />
          </div>
        </div>
        <div className="stats shadow bg-orange-400 bg-opacity-20">
          <div className="stat flex  items-center">
            <div>
              <div className="stat-title">All Classes</div>
              <div className="stat-value">{stats.allClass}</div>
            </div>
            <MdClass className="text-4xl text-orange-400 " />
          </div>
        </div>
        <div className="stats shadow bg-sky-400 bg-opacity-20">
          <div className="stat flex  items-center">
            <div>
              <div className="stat-title">Approved Classes</div>
              <div className="stat-value">{stats.classes}</div>
            </div>
            <AiOutlineCheckCircle className="text-4xl text-sky-400 " />
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
              <th>Enrollments</th>
              <th>Feedbacks</th>
              <th>Average Rating</th>
              <th>Assignments</th>
              <th>Expected submission</th>
              <th>Assignment Submissions</th>
            </tr>
          </thead>
          {stats.classOverview.map((aClass, idx) => (
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
                <td>{aClass.enrollmentCount}</td>
                <td>{aClass.reviewCount}</td>
                <td>
                  {aClass.averageRating ? aClass.averageRating.toFixed(1) : "0"}
                </td>
                <td>{aClass.assignmentCount}</td>
                <td>{aClass.enrollmentCount * aClass.assignmentCount}</td>
                <td>
                  <span>
                    {aClass.submissionCount}/
                    {aClass.enrollmentCount * aClass.assignmentCount}
                  </span>
                  <br />
                  <progress
                    className="progress progress-info  w-32"
                    value={
                      (aClass.submissionCount /
                        (aClass.enrollmentCount * aClass.assignmentCount)) *
                      100
                    }
                    max="100"
                  ></progress>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default TeacherHome;
