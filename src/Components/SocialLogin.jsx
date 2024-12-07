import { FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import usePostUser from "../hooks/usePostUser";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  const { postUserInfo } = usePostUser();
  const { googleLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from.pathname || "/";
  const handleSocialLogin = () => {
    googleLogin()
      .then(async (result) => {
        console.log(result.user);
        const userInfo = {
          name: result.user.displayName,
          email: result.user.email,
        };
        await postUserInfo(userInfo);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "User logged in successfull",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <div>
      <button
        onClick={handleSocialLogin}
        className="btn  btn-block glass text-blue-400"
      >
        <FcGoogle className="text-2xl" /> Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
