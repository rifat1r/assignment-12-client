import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllClassCard = ({ aClass }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [short, setShort] = useState(true);
  const { data: enrollments = [] } = useQuery({
    queryKey: ["checkEnrollment", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/checkEnrollment/${user?.email}`);
      return res.data;
    },
  });
  return (
    <div className=" w-96 mx-auto">
      <figure className="">
        <img className="w-full h-64 object-cover " src={aClass.image} />
      </figure>
      <div className="px-1 ">
        <h3 className="text-2xl font-semibold">{aClass.title}</h3>
        <p className="text-slate-400">{aClass.name}</p>
        {short ? (
          <>
            <p>
              {aClass.description.split(" ").slice(0, 10).join(" ")}{" "}
              <span
                onClick={() => {
                  setShort(!short);
                }}
                className="text-lg text-blue-500 cursor-pointer"
              >
                {" "}
                ...Show More
              </span>
            </p>
          </>
        ) : (
          <>
            <p>
              {aClass.description}{" "}
              <span
                onClick={() => {
                  setShort(!short);
                }}
                className="text-lg text-blue-500 cursor-pointer"
              >
                Show Less
              </span>
            </p>
          </>
        )}
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-semibold">${aClass.price}</h4>
          {enrollments?.some(
            (enrollment) => enrollment.classId === aClass._id
          ) ? (
            <Link
              state={{ title: aClass.title }}
              to={`/dashboard/myEnrollClassDetails/${aClass._id}`}
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
            <Link to={`/allClass/${aClass._id}`}>
              {" "}
              <Button variant="outlined" size="small">
                Enroll
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllClassCard;
