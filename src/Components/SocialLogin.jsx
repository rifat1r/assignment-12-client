import { FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import usePostUser from "../hooks/usePostUser";

const SocialLogin = () => {
  const { postUserInfo } = usePostUser();
  const { googleLogin } = useAuth();
  const handleSocialLogin = () => {
    googleLogin()
      .then(async (result) => {
        console.log(result.user);
        const userInfo = {
          name: result.user.displayName,
          email: result.user.email,
        };
        await postUserInfo(userInfo);
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <div>
      <button onClick={handleSocialLogin} className="btn">
        <FaGoogle className="text-2xl" /> Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
