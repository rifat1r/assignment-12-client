import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { MdAddToPhotos } from "react-icons/md";
import useUploadImage from "../hooks/useUploadImage";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { getAuth, updateProfile } from "firebase/auth";
import SectionTitle from "./SectionTitle";

const UpdateProfile = ({ userInfo, userId, refetch }) => {
  const auth = getAuth();
  const { user } = useAuth();
  const modalRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const { uploadImage } = useUploadImage();
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (userInfo) {
      setValue("name", userInfo.name);
      setValue("email", userInfo.email || user?.email);
      setValue("number", userInfo.number);
    }
  }, [userInfo, setValue, user?.email]);
  const onSubmit = async (data) => {
    data.userId = userId;

    if (data.image.length > 0) {
      const imageFile = data.image[0];
      const imageURL = await uploadImage(imageFile);
      if (imageURL) {
        data.image = imageURL;
      }
    } else {
      delete data.image;
    }
    const res = await axiosSecure.patch(`/userInfo/${userId}`, data);
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        icon: "success",
        timer: 1500,
        title: "Profile Updated Successfully",
        showConfirmButton: false,
      });
    }
    modalRef.current.close();
    refetch();
    console.log("profile data", data);
    //update user info in firebase
    updateProfile(auth.currentUser, {
      displayName: data.name,
      photoURL: data.image,
    })
      .then(() => {
        console.log("updated from firebase");
      })
      .catch((error) => {
        console.log("error occured");
      });
    reset();
  };
  return (
    <dialog ref={modalRef} id="my_modal_4" className="modal">
      <div className="modal-box w-11/12 max-w-3xl">
        <SectionTitle subHeading={"Update Your Profile"}></SectionTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register("name", { required: false })}
                type="text"
                placeholder="Name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="text"
                className="input input-bordered"
                readOnly
                placeholder="type here"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                {...register("number", { required: false })}
                type="number"
                className="input input-bordered"
                placeholder="Phone Number"
              />
            </div>

            <div className="form-control ">
              <label className="label">
                <span className="label-text">Select an image</span>
              </label>

              <input
                {...register("image", { required: false })}
                type="file"
                className="file-input file-input-bordered file-input-accent w-full max-w-xs"
              />
            </div>
          </div>
          <div className="my-9 ">
            <button className="btn btn-block ">
              <MdAddToPhotos></MdAddToPhotos>
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateProfile;
