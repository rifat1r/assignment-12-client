import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ClassDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { data: aClass = {} } = useQuery({
    queryKey: ["aClass", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${id}`);
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
        </div>
      </div>
      {/* teacher */}
      <div className="flex gap-3 mt-6  border p-5">
        <div className="avatar">
          <div className="h-20 w-20">
            <img src={teacher.image} />
          </div>
        </div>
        <div className="my-auto">
          <h2 className="text-2xl font-semibold">{teacher.name}</h2>
          <p className="text-slate-400">{teacher.title}</p>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
