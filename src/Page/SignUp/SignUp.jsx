import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import usePostUser from "../../hooks/usePostUser";
import SocialLogin from "../../Components/SocialLogin";
import { updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import useUploadImage from "../../hooks/useUploadImage";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    loadCaptchaEnginge(4);
  }, []);
  const handleValidateCaptcha = (e) => {
    const userCaptchValue = e.target.value;
    if (validateCaptcha(userCaptchValue)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const { postUserInfo } = usePostUser();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { uploadImage } = useUploadImage();

  const onSubmit = async (data) => {
    const imageFile = data.image?.[0];
    let imageURL = "";

    if (imageFile) {
      imageURL = await uploadImage(imageFile);
    }

    console.log(data);

    createUser(data.email, data.password)
      .then(async (result) => {
        await updateProfile(auth.currentUser, {
          displayName: data.name,
          photoURL: imageURL || null,
        });

        const userInfo = {
          name: data.name,
          email: data.email,
        };

        if (imageURL) {
          userInfo.image = imageURL;
        }

        await postUserInfo(userInfo);

        console.log(result.user);
        reset();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Sign up successfull",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          title: "Sign-Up Failed",
          text: "An error occurred while creating your account. Please try again.",
          icon: "error",
        });
        // console.log(error.message);
      });
  };

  return (
    <div className="hero  min-h-screen bg-[url('https://i.ibb.co.com/8B1HMRR/andrew-ridley-j-R4-Zf-ri-Ej-I-unsplash.jpg')]">
      <Helmet>
        <title>EduManage | Sign Up</title>
      </Helmet>
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-left">
          <h1 className="text-7xl font-bold text-white mb-4">Sign Up now!</h1>
          <hr />
          <hr />
          <hr />
        </div>
        <div className="card  shrink-0  rounded-md">
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
                {...register("name", {
                  required: true,
                })}
                label="Name"
                variant="standard"
              />
              {errors.name && (
                <p className="text-red-500 text-xl">Name is required</p>
              )}
            </div>

            <div className="form-control bg-slate-300 bg-opacity-40 pl-1">
              <TextField
                {...register("email", {
                  required: true,
                })}
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
                {...register("password", {
                  required: true,
                  maxLength: 20,
                  minLength: 6,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
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
                  <FaEye className="text-2xl "></FaEye>
                </span>
              )}
              {errors.password?.type === "required" && (
                <p className="text-red-600 text-xl">password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600 text-xl">
                  Password should be at least 6 characters
                </p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600 text-xl">
                  Password should be under 20 character
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600 text-xl">
                  Password must have one Uppercase, one lower case, one number
                  and one special character.
                </p>
              )}
            </div>
            <div className="form-control ">
              <label className="mb-2">
                <LoadCanvasTemplate></LoadCanvasTemplate>
              </label>
              <TextField
                onBlur={handleValidateCaptcha}
                type="text"
                label="type the text above"
                variant="standard"
              ></TextField>
            </div>

            <label className="form-control w-full max-w-xs">
              <div className="">
                <span className="text-md text-gray-800 ml-1 ">
                  Choose a photo (optional)
                </span>
                <input
                  {...register("image")}
                  type="file"
                  className="border rounded-md opacity-80 "
                />
              </div>
            </label>
            <div
              className={`form-control mt-6  ${disabled && "tooltip"}`}
              data-tip="type the captcha to enable button"
            >
              <button
                disabled={disabled}
                className="btn btn-block  btn-info rounded-md h-14 "
              >
                <span className="text-white">Sign Up</span>
              </button>
            </div>
            <h3 className="text-center text-gray-700">
              Already have an account?{" "}
              <Link className="text-blue-500 font-medium" to="/signin">
                Sign in
              </Link>
            </h3>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
