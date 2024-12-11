import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FaArrowRightLong } from "react-icons/fa6";
import { FiBook, FiCheckCircle } from "react-icons/fi";
import { Parallax } from "react-parallax";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect } from "react";

const Category = ({
  category,
  classCount,
  title,
  image,
  catName,
  setCategory,
  setValue,
}) => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: enrollments = [] } = useQuery({
    queryKey: ["checkEnrollment", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/checkEnrollment/${user?.email}`);
      return res.data;
    },
  });
  const handleExploreClass = (e) => {
    e.preventDefault();
    setCategory(catName);

    if (catName === "Web development") {
      setValue(1);
    } else if (catName === "DevOps") {
      setValue(2);
    } else if (catName === "Data science") {
      setValue(3);
    } else if (catName === "Crypto") {
      setValue(4);
    } else if (catName === "Digital marketing") {
      setValue(5);
    }
    navigate("/allClasses");
  };

  return (
    <div className="rounded-lg shadow-lg p-4 flex flex-col gap-6 bg-white">
      <div className="relative overflow-hidden rounded-lg">
        <Parallax
          blur={{ min: -50, max: 50 }}
          bgImage={image}
          bgImageAlt="the menu"
          strength={-100}
        >
          <div className="hero h-[300px]">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content ">
              <h1 className=" text-4xl font-bold uppercase ">{catName}</h1>
            </div>
          </div>
        </Parallax>
      </div>

      {/* Category Info */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="font-semibold text-lg mt-2 flex items-center gap-1 text-slate-400">
          <FiBook className="text-2xl text-amber-400" /> {classCount} Classes
          available
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-700 border-b border-sky-300 pb-2">
          Popular Classes
        </h3>
        {category.map((classItem) => (
          <div
            key={classItem._id}
            className="flex items-center gap-4 border p-2 rounded-md hover:bg-gray-50"
          >
            <img
              src={classItem.image}
              alt="Class"
              className="w-16 h-16 rounded-md object-cover"
            />
            <div className="flex-grow space-y-1">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-semibold text-gray-800">
                  {classItem.title}
                </h4>
                <p className="text-xs font-semibold bg-orange-400 text-white px-1 rounded">
                  ${classItem.price}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-blue-500 flex items-center gap-1">
                  <FiCheckCircle className="text-2xl text-blue-400" />
                  {classItem.enrollmentCount} Enrollments
                </p>
                {enrollments?.some(
                  (enrollment) => enrollment.classId === classItem._id
                ) ? (
                  <Link
                    state={{ title: classItem.title }}
                    to={`/dashboard/myEnrollClassDetails/${classItem._id}`}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        color: "green",
                      }}
                    >
                      Continue
                    </Button>
                  </Link>
                ) : (
                  <Link to={`/allClass/${classItem._id}`}>
                    <Button variant="outlined" size="small">
                      Enroll
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleExploreClass}
        className="btn btn-accent border-0 border-b-4 border-r-4 border-gray-300 text-white"
      >
        Explore All Classes
        <FaArrowRightLong className="text-xl"></FaArrowRightLong>
      </button>
    </div>
  );
};

export default Category;
