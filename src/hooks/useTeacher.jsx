import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useTeacher = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: isTeacher = {}, isPending: isTeacherLoading } = useQuery({
    queryKey: ["isTeacher", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/teacher/${user?.email}`);
      console.log(res.data);
      return res.data?.teacher;
    },
  });
  return [isTeacher, isTeacherLoading];
};

export default useTeacher;
