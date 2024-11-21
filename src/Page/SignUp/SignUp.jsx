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

const SignUp = () => {
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
        console.log(error.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl rounded-md">
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
            <div className="form-control">
              <TextField
                {...register("name", {
                  required: true,
                })}
                label="Name"
                variant="outlined"
              />
              {errors.name && (
                <p className="text-red-500 text-xl">Name is required</p>
              )}
            </div>

            <div className="form-control">
              <TextField
                {...register("email", {
                  required: true,
                })}
                label="Email"
                variant="outlined"
              />
              {errors.email && (
                <p className="text-red-500 text-xl">Email is required</p>
              )}
            </div>
            <div className="form-control">
              <TextField
                type="password"
                {...register("password", {
                  required: true,
                  maxLength: 20,
                  minLength: 6,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                label="Password"
                variant="outlined"
              />
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
                variant="outlined"
              ></TextField>
            </div>

            {/* <input type="file" className="btn" /> */}
            <label className="form-control w-full max-w-xs">
              <div className="">
                <span className="text-md ml-1 ">Choose a photo (optional)</span>
                <input
                  {...register("image")}
                  type="file"
                  className="file-input  file-input-bordered "
                />
              </div>
            </label>
            <div className="form-control mt-6">
              <button
                disabled={disabled}
                className="btn btn-secondary rounded-md h-14"
              >
                Sign Up
              </button>
            </div>
            <h3 className="text-center">
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
