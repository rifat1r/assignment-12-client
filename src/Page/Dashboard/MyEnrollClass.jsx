import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const MyEnrollClass = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: enrollClass = [] } = useQuery({
    queryKey: ["enrolledClass"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/student/${user.email}`);
      return res.data.result;
    },
  });
  return (
    <div className="">
      <p>My enroll class : {enrollClass.length}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-5">
        {enrollClass.map((aClass) => (
          <div
            key={aClass._id}
            className="card card-side card-bordered  shadow-xl "
          >
            <figure className="w-1/2 lg:w-2/5 h-full">
              <img className=" h-full object-fill" src={aClass.image} />
            </figure>
            <div className="m-3  w-1/2 lg:w-3/5 flex flex-col justify-between">
              <div className="">
                <h2 className="card-title">{aClass.title}</h2>
                <p className="text-blue-500">{aClass.name}</p>
              </div>
              <div className="card-actions justify-end">
                <Link to={`/dashboard/myEnrollClassDetails/${aClass._id}`}>
                  {" "}
                  <button className="btn btn-primary ">Continue</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEnrollClass;
