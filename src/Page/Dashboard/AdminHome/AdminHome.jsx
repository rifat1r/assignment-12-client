import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUploadImage from "../../../hooks/useUploadImage";
import { useQuery } from "@tanstack/react-query";
import {
  FaClipboardList,
  FaCloudArrowUp,
  FaDollarSign,
  FaUserGraduate,
  FaUsers,
  FaUserTie,
} from "react-icons/fa6";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
import useAuth from "../../../hooks/useAuth";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const AdminHome = () => {
  const { user } = useAuth();
  const { uploadImage } = useUploadImage();
  const axiosSecure = useAxiosSecure();
  const handleUpload = async (e) => {
    e.preventDefault();
    const imageFile = e.target.image.files[0];
    console.log("image", imageFile);
    if (imageFile) {
      const imageURL = await uploadImage(imageFile);
      const res = await axiosSecure.post("/bannerImage", {
        image: imageURL,
      });
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          timer: 1500,
          title: "Banner image Uploaded Successfully",
          showConfirmButton: false,
        });
      }
    }
  };
  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };
  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
  return (
    <div className="max-w-7xl">
      <h1 className="text-4xl font-bold">Welcome Back, {user.displayName}</h1>
      <div className="space-x-4 space-y-3">
        <div className="stats shadow bg-blue-400 bg-opacity-20">
          <div className="stat flex  items-center">
            <div>
              <div className="stat-title">Revenue</div>
              <div className="stat-value">${stats.totalRevenue}</div>
            </div>
            <FaDollarSign className="text-4xl text-blue-400" />
          </div>
        </div>
        <div className="stats shadow bg-violet-400 bg-opacity-20">
          <div className="stat flex items-center">
            <div>
              <div className="stat-title">Teachers</div>
              <div className="stat-value">{stats.teachersCount}</div>
            </div>
            <FaUserTie className="text-4xl text-violet-400"></FaUserTie>
          </div>
        </div>
        <div className="stats shadow bg-orange-400 bg-opacity-20">
          <div className="stat flex items-center">
            <div>
              <div className="stat-title"> Students</div>
              <div className="stat-value">{stats.totalStudents}</div>
            </div>
            <FaUserGraduate className="text-4xl text-orange-400"></FaUserGraduate>
          </div>
        </div>
        <div className="stats shadow bg-green-400 bg-opacity-20">
          <div className="stat flex items-center">
            <div>
              <div className="stat-title">Users</div>
              <div className="stat-value">{stats.usersCount}</div>
            </div>
            <FaUsers className="text-4xl text-green-400"></FaUsers>
          </div>
        </div>
        <div className="stats shadow bg-amber-400 bg-opacity-20">
          <div className="stat flex items-center">
            <div className="">
              <div className="stat-title">Enrollments</div>
              <div className="stat-value">{stats.totalEnrollment}</div>
            </div>
            <FaClipboardList className="text-3xl text-amber-400"></FaClipboardList>
          </div>
        </div>
        <div className="stats shadow bg-sky-400 bg-opacity-20">
          <div className="stat flex items-center">
            <div>
              <div className="stat-title">Classes</div>
              <div className="stat-value">{stats.classesCount}</div>
            </div>
            <FaChalkboardTeacher className="text-4xl text-sky-400"></FaChalkboardTeacher>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-bold mb-3 mt-10 ">
          Enrollment Statistics by Category
        </h2>
        <BarChart
          width={800}
          height={400}
          data={stats.enrollment}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Bar
            dataKey="enrollmentCount"
            fill="#8884d8"
            shape={<TriangleBar />}
            label={{ position: "top" }}
          >
            {(stats.enrollment || []).map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))}
          </Bar>
        </BarChart>
      </div>
      <form onSubmit={handleUpload} className="p-6 rounded-lg mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Upload Banner Image
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="file"
            required
            name="image"
            className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
          />
          <button type="submit" className="btn btn-primary">
            <FaCloudArrowUp className="text-xl"></FaCloudArrowUp>
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminHome;
