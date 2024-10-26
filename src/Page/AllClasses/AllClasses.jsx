import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import AllClassCard from "./AllClassCard";

const AllClasses = () => {
  const axiosPublic = useAxiosPublic();
  const { data: allClass = [] } = useQuery({
    queryKey: ["allClass"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allClass");
      return res.data;
    },
  });
  return (
    <div className="max-w-7xl mx-auto ">
      <h2 className="text-4xl"> All classes : {allClass.length} </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  ">
        {" "}
        {allClass.map((aClass) => (
          <AllClassCard key={aClass._id} aClass={aClass}></AllClassCard>
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
