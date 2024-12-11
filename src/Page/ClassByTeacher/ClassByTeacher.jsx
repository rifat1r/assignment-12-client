import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionTitle from "../../Components/SectionTitle";
import AllClassCard from "../AllClasses/AllClassCard";

const ClassByTeacher = () => {
  const { email } = useParams();
  const axiosPublic = useAxiosPublic();
  const { data: teacher = {} } = useQuery({
    queryKey: ["teacher", email],

    queryFn: async () => {
      const res = await axiosPublic.get(`/teacher/${email}`);
      return res.data;
    },
  });
  const { data: classes = [] } = useQuery({
    queryKey: ["classByTeacher", email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/classByTeacher/${email}`);
      return res.data;
    },
  });
  return (
    <div className="max-w-7xl mx-auto">
      <div className="border flex flex-col md:flex-row gap-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
        <div className="avatar m-4">
          <div className=" h-52 w-52 ">
            <img
              className="rounded-md object-cover"
              src={
                teacher.image ||
                "https://i.ibb.co.com/ThfJGYb/453178253-471506465671661-2781666950760530985-n.png"
              }
              alt="profile picture"
            />
          </div>
        </div>
        <div className="my-auto">
          <h2 className="text-2xl text-amber-300 font-semibold  ">
            {" "}
            {teacher.name}
          </h2>
          <h3 className="text-xl  mb-6 border-b-4 pb-2">{teacher.title}</h3>
          <p>Category : {teacher.category}</p>
          <p> Level of experience : {teacher.experience}</p>
          <p>Total Class : {classes.length}</p>
        </div>
      </div>
      <SectionTitle
        heading={`Courses Taught by ${teacher.name}`}
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {classes.map((aClass) => (
          <AllClassCard key={aClass._id} aClass={aClass}></AllClassCard>
        ))}
      </div>
    </div>
  );
};

export default ClassByTeacher;
