import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Button } from "@mui/material";
import { MdPayment } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import ReviewCard from "../../Components/ReviewCard";
import { FaStar } from "react-icons/fa6";

const ClassDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  //get the class info
  const { data: aClass = {} } = useQuery({
    queryKey: ["aClass", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/class/${id}`);
      return res.data;
    },
  });
  // console.log(typeof aClass.price, "data type");
  // get the teacher info
  const { data: teacher = {} } = useQuery({
    queryKey: [aClass.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacher/${aClass.email}`);
      return res.data;
    },
  });
  //get the reviews for this class
  const { data: feedbacks = [] } = useQuery({
    queryKey: ["feedbacks", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });
  const avgRating = feedbacks.reduce(
    (sum, feedback) => sum + feedback.rating,
    0
  );
  return (
    <div className=" max-w-7xl mx-auto ">
      <div className="flex flex-col lg:flex-row gap-5 items-center justify-between p-2">
        <div className="w-full lg:w-2/5">
          <img className="w-full  object-cover " src={aClass.image} />
        </div>
        <div className="w-full lg:w-3/5  space-y-2 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl">{aClass.title}</h2>
            <p>{aClass.description}</p>
            <p className="text-lg font-semibold text-gray-600 mt-3  flex items-center ">
              <FaDollarSign></FaDollarSign>
              Price: ${aClass.price}
            </p>
            {feedbacks.length > 0 && (
              <p className="flex items-center gap-1">
                Average Rating : {(avgRating / feedbacks.length).toFixed(1)}
                <FaStar className="text-amber-500 text-lg"></FaStar> (
                {feedbacks.length})
              </p>
            )}
          </div>
          <div>
            <Link
              to="/payment"
              state={{ price: aClass.price, classId: aClass._id }}
            >
              <Button size="large" variant="outlined">
                {" "}
                <MdPayment className="text-2xl mr-2"></MdPayment>
                Pay Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* teacher */}
      <div className="flex gap-3 mt-6   p-5 bg-gradient-to-r from-slate-300">
        <div className="avatar">
          <div className="h-20 w-20">
            <img src={teacher.image} />
          </div>
        </div>
        <div className="my-auto">
          <h2 className="text-2xl font-semibold">{teacher.name}</h2>
          <p className="text-blue-400">{teacher.title}</p>
          <div className="flex gap-1">
            <p>{teacher.category}</p>
            <span>|</span>
            <p>{teacher.experience}</p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">Review: {feedbacks.length}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {feedbacks.map((feedback) => (
            <ReviewCard key={feedback._id} feedback={feedback}></ReviewCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
