import { Rating } from "@mui/material";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const TERModal = ({ id, classTitle }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [value, setValue] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const description = e.target.description.value;
    const rating = value;
    const time = new Date();
    // console.log(description, rating);
    const res = await axiosSecure.post("/reviews", {
      rating: rating,
      review: description,
      email: user?.email,
      image: user?.photoURL,
      time: time,
      classTitle: classTitle,
      name: user?.displayName,
      classId: id,
    });
    e.target.reset();
    setValue(0);
    if (res.data.insertedId) {
      Swal.fire({
        title: "Submitted",
        text: "Your feedback submitted Successfully.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="">
      <input type="checkbox" id={`modal_${id}`} className="modal-toggle" />
      <div className="modal " role="dialog">
        <form onSubmit={handleSubmit}>
          <div className="modal-box w-screen ">
            <h2 className="text-2xl text-center   text-blue-400">
              Submit Your Feedback here
            </h2>
            <div className="divider -mt-1 px-20"></div>

            <div className="text-center font-extrabold">
              <Rating
                aria-required
                name="simple-controlled"
                size="large"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </div>
            <br />

            <textarea
              className="textarea textarea-bordered border-gray-400 textarea-md w-full max-w-xl "
              name="description"
              required
              placeholder="Write your review here..."
            ></textarea>
            <div className="modal-action">
              <button type="submit" className="btn btn-accent">
                Submit
              </button>
              <label htmlFor={`modal_${id}`} className="btn">
                Close
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TERModal;
