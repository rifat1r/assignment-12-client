import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useState } from "react";

const useTeacher = () => {
  const [category, setCategory] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: isTeacher = {}, isPending: isTeacherLoading } = useQuery({
    queryKey: ["isTeacher", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/teacher/${user?.email}`);
      console.log(res.data);
      setCategory(res.data?.category);
      return res.data?.status;
    },
  });
  return [isTeacher, isTeacherLoading, category];
};

export default useTeacher;
