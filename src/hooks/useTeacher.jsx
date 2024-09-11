import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useTeacher = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: requestStatus = {}, isPending: isTeacherLoading } = useQuery({
    queryKey: ["requestStatus", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/teacher/${user?.email}`);
      console.log(res.data);
      return res.data?.status;
    },
  });
  return [requestStatus, isTeacherLoading];
};

export default useTeacher;
