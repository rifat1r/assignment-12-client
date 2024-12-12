import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../Components/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const SignIn = () => {
  const [show, setShow] = useState(false);
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from.pathname || "/";

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    login(data.email, data.password)
      .then((result) => {
        reset();
        console.log(result.user);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "User logged in successfull",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          title: "Login Failed",
          text: "Invalid email or password. Please try again.",
          icon: "error",
        });
        // console.log(error.message);
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen bg-[url('https://i.ibb.co.com/8B1HMRR/andrew-ridley-j-R4-Zf-ri-Ej-I-unsplash.jpg')]">
      <Helmet>
        <title>EduManage | Sign In</title>
      </Helmet>
      <div className="hero-content flex-col ">
        <div className="text-center ">
          <h1 className="text-7xl font-bold text-white mb-4">Sign In</h1>
          <hr />
          <hr />
          <hr />
          <hr />
        </div>
        <div className="card  w-80 lg:w-96 shrink-0  rounded-md  ">
          <div className="mx-9 mt-7 -mb-4">
            <div className="text-center ">
              <SocialLogin></SocialLogin>
            </div>
            <div className="divider">OR</div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body space-y-5"
          >
            <div className="form-control bg-slate-300 bg-opacity-40 pl-1">
              <TextField
                {...register("email", { required: true })}
                id="outlined-basic"
                label="Email"
                variant="standard"
              />
              {errors.email && (
                <p className="text-red-500 text-xl">Email is required</p>
              )}
            </div>
            <div className="form-control relative bg-slate-300 bg-opacity-40 pl-1">
              <TextField
                type={show ? "text" : "password"}
                {...register("password", { required: true })}
                id="outlined-basic"
                label="Password"
                variant="standard"
              />
              {show ? (
                <span
                  onClick={() => setShow(false)}
                  className="absolute right-4 top-4 cursor-pointer text-gray-600"
                >
                  <FaEyeSlash className="text-2xl"></FaEyeSlash>
                </span>
              ) : (
                <span
                  onClick={() => setShow(true)}
                  className="absolute right-4 top-4 cursor-pointer text-gray-600"
                >
                  <FaEye className="text-2xl"></FaEye>
                </span>
              )}

              {errors.password && (
                <p className="text-red-500 text-xl">Password is required</p>
              )}
            </div>

            <div className="form-control mt-6">
              <button className="btn text-white  btn-info rounded-md opacity-70">
                Sign In
              </button>
            </div>
            <h2 className="text-center text-gray-700">
              New to this site?{" "}
              <Link className="text-blue-500 font-medium " to="/signup">
                sign up
              </Link>
            </h2>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
