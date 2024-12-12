import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Button, Rating, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

const FeaturedClass = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: classes = [], isPending: loading } = useQuery({
    queryKey: ["featuredClass"],
    queryFn: async () => {
      const res = await axiosPublic.get("/featuredClasses");
      return res.data;
    },
  });
  const { data: enrollments = [] } = useQuery({
    queryKey: ["checkEnrollment", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/checkEnrollment/${user?.email}`);
      return res.data;
    },
  });
  if (loading) {
    return (
      <div className="flex justify-center mt-36">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {classes.map((aClass) => (
        <div
          data-aos="zoom-in"
          key={aClass._id}
          className="card w-96 rounded-sm  m-auto"
        >
          <figure>
            <img className="h-full w-full object-cover" src={aClass.image} />
          </figure>
          <div className="flex items-center  gap-5 p-4 pb-2 ">
            <div className="avatar">
              <div className="mask mask-circle h-14 w-14">
                <img
                  src={aClass?.teacher.image}
                  onError={(e) => {
                    e.target.src =
                      "https://i.ibb.co.com/VWLjs5S/453178253-471506465671661-2781666950760530985-n.png";
                  }}
                />
              </div>
            </div>
            <div className="flex gap-16 ">
              <div>
                <div className="font-bold">{aClass.teacher.name}</div>
                <div className="text-sm opacity-50">
                  {aClass.teacher.category} | {aClass.teacher.experience}
                </div>
              </div>
            </div>
          </div>
          <div className="card-body  px-2 pt-0 pb-0">
            <h2 className="card-title">{aClass.title}</h2>
            <div className="flex justify-between items-center ">
              <div className="text-yellow-500 flex items-center gap-1">
                <div>
                  <Stack spacing={1}>
                    <Rating
                      name="half-rating-read"
                      size="large"
                      precision={0.1}
                      value={aClass.averageRating}
                      readOnly
                    />
                  </Stack>
                </div>
                <p className="text-lg font-medium text-gray-500">
                  ({aClass.reviewCount} reviews)
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mx-2 mt-2">
            <h2 className="text-xl font-semibold">${aClass.price}</h2>
            {enrollments?.some(
              (enrollment) => enrollment.classId === aClass._id
            ) ? (
              <Link
                state={{ title: aClass.title }}
                to={`/dashboard/myEnrollClassDetails/${aClass._id}`}
              >
                <Button variant="outlined" size="small">
                  Continue
                </Button>
              </Link>
            ) : (
              <Link to={`/allClass/${aClass._id}`}>
                {" "}
                <Button variant="outlined" size="small">
                  Enroll
                </Button>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedClass;
