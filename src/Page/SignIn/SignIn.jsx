import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../Components/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignIn = () => {
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
        console.log(error.message);
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign In</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl rounded-md  ">
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
                {...register("email", { required: true })}
                id="outlined-basic"
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
                {...register("password", { required: true })}
                id="outlined-basic"
                label="Password"
                variant="outlined"
              />
              {errors.password && (
                <p className="text-red-500 text-xl">Password is required</p>
              )}
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-secondary rounded-md h-14">
                Sign In
              </button>
            </div>
            <h2 className="text-center">
              New to this site?{" "}
              <Link className="text-blue-500 font-medium" to="/signup">
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
