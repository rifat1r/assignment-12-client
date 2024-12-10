import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaUserGraduate } from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";
import {
  FaChalkboardTeacher,
  FaCheckCircle,
  FaUserFriends,
} from "react-icons/fa";

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
      className="max-w-7xl mx-auto py-10 px-4 md:px-8 rounded-lg shadow-lg "
      style={{ background: "linear-gradient(to right, #f9fafb, #eaeff3)" }}
    >
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-6">
        <div className="w-full lg:w-1/2 space-y-5">
          <h2 className="text-3xl font-semibold mb-2">EduManage at a Glance</h2>
          <p className="mb-4">
            Discover the impact of EduManage with our key stats! Track the total
            number of active classes, registered users, and successful
            enrollments that make our platform a thriving hub for education.
            Join a growing community of learners and educators contributing to a
            brighter future
          </p>
          {/* stats */}
          <div className="flex flex-wrap justify-center items-center gap-6">
            <div className="flex items-center justify-center gap-2 bg-sky-400 bg-opacity-25 py-2 px-3 rounded-lg shadow">
              <FaChalkboardTeacher className="text-4xl text-sky-400" />
              <div>
                <h1 className="text-2xl font-bold">{stats.classCount}+</h1>
                <h2 className=" font-medium">Total Classes</h2>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 bg-violet-400 bg-opacity-25 py-2 px-3 rounded-lg shadow">
              <FaUserFriends className="text-4xl text-violet-400" />
              <div>
                <h1 className="text-2xl font-bold">{stats.userCount}+</h1>
                <h2 className=" font-medium">Total Users</h2>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 bg-amber-400 bg-opacity-25 py-2 px-3 rounded-lg shadow">
              <FiCheckCircle className="text-4xl text-amber-400" />
              <div>
                <h1 className="text-2xl font-bold">{stats.enrollmentCount}+</h1>
                <h2 className=" font-medium">Total Enrollments</h2>
              </div>
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
