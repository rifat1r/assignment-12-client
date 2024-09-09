import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../Components/SocialLogin";

const SignIn = () => {
  const { login } = useAuth();
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
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl rounded-md">
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
            <SocialLogin></SocialLogin>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
