import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useRef } from "react";

const AddAssignment = ({ classId }) => {
  const modalRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const {
    reset,
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    data.classId = classId;
    data.date = new Date();
    // console.log(data);
    const res = await axiosSecure.post("/assignment", data);
    console.log(res.data);
    if (res.data.insertedId) {
      Swal.fire({
        title: "Added",
        text: "Assignment Added Successfully.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      modalRef.current.close();
    }
    reset();
  };
  return (
    <dialog ref={modalRef} id="my_modal_2" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add Assignment</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Name"
              className="input input-bordered"
            />
            {errors.title && (
              <p className="text-red-500 text-xl">Title is required</p>
            )}
          </div>
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              {...register("description", { required: true })}
              type="text"
              className="textarea textarea-bordered flex items-start gap-2 "
              placeholder="Description"
            />

            {errors.description && (
              <p className="text-red-500 text-xl">Description is required</p>
            )}
          </div>
          <div className="flex justify-between ">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Deadline</span>
              </label>
              <input
                {...register("deadline", { required: true })}
                type="date"
                placeholder="Name"
                className="input input-bordered"
              />
              {errors.deadline && (
                <p className="text-red-500 text-xl">Deadline is required</p>
              )}
            </div>
            <div className="flex items-end">
              <button type="submit" className="btn ">
                Add Assignment
              </button>
            </div>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default AddAssignment;
