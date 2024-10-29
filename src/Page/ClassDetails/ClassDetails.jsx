import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Button } from "@mui/material";

const ClassDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { data: aClass = {} } = useQuery({
    queryKey: ["aClass", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/class/${id}`);
      return res.data;
    },
  });
  const { data: teacher = {} } = useQuery({
    queryKey: [aClass.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacher/${aClass.email}`);
      return res.data;
    },
  });
  return (
    <div className=" max-w-7xl mx-auto">
      <div className="flex gap-5">
        <div className="w-1/3">
          <img className="w-full h-72 object-cover" src={aClass.image} />
        </div>
        <div className="w-2/3  space-y-2">
          <h2 className="text-3xl">{aClass.title}</h2>
          <p>{aClass.description}</p>
          <div>
            <Link
              to="/payment"
              state={{ price: aClass.price, classId: aClass._id }}
            >
              <Button variant="contained"> Pay Now</Button>
            </Link>
          </div>
        </div>
      </div>
      {/* teacher */}
      <div className="flex gap-3 mt-6  border p-5 bg-slate-200">
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
    </div>
  );
};

export default ClassDetails;
