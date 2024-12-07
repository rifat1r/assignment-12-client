import { useState } from "react";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useDashboardDetect = () => {
  const [role, setRole] = useState(null);
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: isAdminData, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/admin/${user?.email}`);
      return res.data?.admin; // Return the admin status
    },
    onSuccess: (isAdmin) => {
      if (isAdmin) setRole("admin");
    },
  });

  const { data: isTeacherData, isLoading: isTeacherLoading } = useQuery({
    queryKey: ["isTeacher", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/teacher/${user?.email}`);
      return res.data?.status === "approved"   // Return if teacher is approved
    },
    onSuccess: (isTeacher) => {
      if (!role && isTeacher) setRole("teacher"); // Set role to teacher if no role is set
    },
  });

  const isLoading = loading || isAdminLoading || isTeacherLoading;

  return { role, isLoading };
};

export default useDashboardDetect;
