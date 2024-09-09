import useAxiosPublic from "./useAxiosPublic";

const usePostUser = () => {
  const axiosPublic = useAxiosPublic();
  const postUserInfo = async (userInfo) => {
    const res = await axiosPublic.post("/users", userInfo);
    console.log(res.data);
  };
  return { postUserInfo };
};

export default usePostUser;
