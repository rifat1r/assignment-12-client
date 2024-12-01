import { Button, Rating, Stack } from "@mui/material";
import { useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaCloudArrowUp } from "react-icons/fa6";

const TERModal = ({ id, classTitle }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [value, setValue] = useState(0);
  const modalRef = useRef(null);
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
      modalRef.current.close();
    }
  };
  return (
    <dialog ref={modalRef} id="my_modal_2" className="modal">
      <div className="modal-box ">
        <form onSubmit={handleSubmit}>
          <div className=" ">
            <h2 className="text-2xl text-center   text-blue-400">
              {classTitle}
            </h2>
            <div className="divider -mt-1 px-20"></div>

            <div className="font-extrabold">
              <Stack
                sx={{
                  alignItems: "center",
                }}
                spacing={1}
              >
                <Rating
                  aria-required
                  name="half-rating"
                  size="large"
                  precision={0.1}
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Stack>
            </div>
            <br />

            <textarea
              className="textarea textarea-bordered border-gray-400 textarea-md w-full max-w-xl "
              name="description"
              required
              placeholder="Write your review here..."
            ></textarea>
            <div className="modal-action">
              <Button variant="contained" type="submit">
                <FaCloudArrowUp className="text-2xl mr-2"></FaCloudArrowUp>
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className="modal-action">
        <form method="dialog">
          <button className="btn">Close</button>
        </form>
      </div>
    </dialog>
  );
};

export default TERModal;
