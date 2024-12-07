import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaUserGraduate } from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";
import { FaChalkboardTeacher, FaUserFriends } from "react-icons/fa";

const HomeStats = () => {
  const axiosPublic = useAxiosPublic();
  const { data: stats = {} } = useQuery({
    queryKey: ["home-stats"],
    queryFn: async () => {
      const res = await axiosPublic.get("/home-stats");
      return res.data;
    },
  });
  return (
    <div
      className="max-w-7xl mx-auto py-8 px-4 rounded-lg shadow-lg"
      style={{ background: "linear-gradient(to right, #f9fafb, #eaeff3)" }}
    >
      <h2 className="text-center text-4xl lg:text-5xl text-gray-500 font-semibold mb-6 -mt-3">
        Our Impact in Numbers
      </h2>
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-stretch gap-6">
        <div className="flex flex-col gap-6 w-full lg:w-1/2">
          <div className="flex items-center justify-center gap-4 bg-sky-400 bg-opacity-25 py-4 px-6 rounded-lg shadow">
            <FaChalkboardTeacher className="text-6xl text-sky-400" />
            <div>
              <h1 className="text-4xl font-bold">{stats.classCount}+</h1>
              <h2 className="text-lg font-medium">Total Classes</h2>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 bg-violet-400 bg-opacity-25 py-4 px-6 rounded-lg shadow">
            <FaUserFriends className="text-6xl text-violet-400" />
            <div>
              <h1 className="text-4xl font-bold">{stats.userCount}+</h1>
              <h2 className="text-lg font-medium">Total Users</h2>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 bg-amber-400 bg-opacity-25 py-4 px-6 rounded-lg shadow">
            <FaUserGraduate className="text-6xl text-amber-400" />
            <div>
              <h1 className="text-4xl font-bold">{stats.enrollmentCount}+</h1>
              <h2 className="text-lg font-medium">Total Enrollments</h2>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <img
            className="rounded-lg object-cover w-full lg:w-auto h-72 lg:h-auto"
            src="https://i.ibb.co/6PqzThp/student-online-cute-guy-checked-shirt-with-glasses-studying-computer-confused-about-class.jpg"
            alt="Student studying"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeStats;
