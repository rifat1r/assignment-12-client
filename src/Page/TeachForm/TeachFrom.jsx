import { useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useTeacher from "../../hooks/useTeacher";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useEffect } from "react";
import SectionTitle from "../../Components/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMGBB_PK;

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const TeachFrom = () => {
  const navigate = useNavigate();
  const [isTeacher] = useTeacher();
  console.log("status-------", isTeacher);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (isTeacher === "rejected") {
      Swal.fire({
        title: "Your request have been rejected!",
        text: "You can try to another",
        icon: "info",
      });
    }
    if (isTeacher === "pending") {
      Swal.fire({
        title: "Thanks for your submission!",
        text: "Your request being reviewed by our team",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Go Back",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(-1);
        }
      });
    }
  }, [isTeacher, navigate]);

  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.image[0] };
    //upload the image then get url
    const imgRes = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(imgRes.data);
    if (imgRes.data.success) {
      const teacherInfo = {
        name: user?.displayName,
        email: user?.email,
        title: data.title,
        category: data.category,
        experience: data.experience,
        image: imgRes.data.data.display_url,
      };
      const res = await axiosSecure.post("/teacherRequest", teacherInfo);
      console.log(res.data);
      if (res.data.insertedId) {
        reset();
        Swal.fire({
          icon: "success",
          title: "Your request has been submitted",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload();
        });
      }
    }
  };

  if (isTeacher === "approved") {
    return (
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col md:flex-row">
          <img
            src={
              user?.photoURL
                ? user.photoURL
                : "https://i.ibb.co.com/VWLjs5S/453178253-471506465671661-2781666950760530985-n.png"
            }
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">
              Congratulations,{" "}
              <span className="text-lime-500">{user.displayName}</span>
            </h1>
            <p className="py-6 text-2xl font-normal text-gray-400">
              Your request to become a teacher has been approved. Welcome to our
              teaching team!
            </p>
            {/* <button className="btn btn-primary">Add Class</button> */}
            <div className="space-x-7">
              <Link to="/dashboard/addClass">
                <Button variant="contained">Add Class</Button>
              </Link>
              <Button
                onClick={() => {
                  navigate(-1);
                }}
                variant="outlined"
              >
                GO Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto ">
      <SectionTitle subHeading={"Join as a teacher"}></SectionTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              defaultValue={user?.displayName}
              readOnly
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              defaultValue={user?.email}
              readOnly
              className="input input-bordered"
            />
          </div>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">What is your experience level*</span>
            </div>
            <select
              {...register("experience", { required: true })}
              className="select select-bordered"
              defaultValue="default"
            >
              <option disabled value={"default"}>
                Select One
              </option>
              <option>beginner</option>
              <option>mid-level</option>
              <option>Experienced</option>
            </select>
          </label>
          {errors.experience && (
            <p className="text-red-500 text-xl">Select your experience level</p>
          )}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Select a category*</span>
            </div>
            <select
              {...register("category", { required: true })}
              className="select select-bordered"
              defaultValue="default"
            >
              <option disabled value={"default"}>
                Select One
              </option>
              <option>Web development</option>
              <option>Digital marketing</option>
              <option>Data science</option>
              <option>DevOps</option>
              <option>Crypto</option>
            </select>
          </label>
          {errors.category && (
            <p className="text-red-500 text-xl">Select your experience level</p>
          )}
          <div className="form-control col-span-1 md:col-span-2">
            <label className="label">
              <span className="label-text">Title*</span>
            </label>
            <input
              type="text"
              placeholder="title"
              className="input input-bordered"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <p className="text-red-500 text-xl">Title is required</p>
            )}
          </div>
        </div>
        <div className="my-6">
          <label className="label">
            <span className="label-text">Select your photo*</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered file-input-info w-full max-w-xs "
            {...register("image", { required: true })}
          />
          {errors.image && (
            <p className="text-red-500 text-xl">Image is required</p>
          )}
        </div>

        <div className="text-end">
          <button
            disabled={isTeacher === "pending"}
            className="btn btn-accent my-5 text-white"
          >
            <FaUpload></FaUpload>
            {isTeacher === "not_found" && "Submit for review"}
            {isTeacher === "rejected" && "Request to another"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeachFrom;
