import useAxiosPublic from "./useAxiosPublic";

const useTeacherInfo = () => {
  const axiosPublic = useAxiosPublic();

  // Function to fetch teacher information
  const teacherInfo = async ({ email }) => {
    if (email) {
      const res = await axiosPublic.get(`/teacher/${email}`);
      console.log("teacher information", res.data);
      return res.data;
    }
  };

  return { teacherInfo };
};

export default useTeacherInfo;
