import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./JoinAsTeacher.css";

const JoinAsTeacher = () => {
  return (
    <div className="max-w-7xl mx-auto  rounded-lg shadow-lg bg-image bg-fixed bg-center bg-contain ">
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 p-8 my-10 bg-slate-500 bg-opacity-50 ">
        <div className="w-full md:w-1/3 flex justify-center ">
          <img
            className="w-full object-cover rounded-md"
            src="https://i.ibb.co.com/y45Kwyr/pexels-max-fischer-5212320-Photoroom.png"
            alt="Educator"
          />
        </div>
        <div className="w-full md:w-2/3 text-center md:text-left pr-5 text-white">
          <h2 className="text-4xl font-bold  mb-4">
            Teach and Inspire with eduMange
          </h2>
          <p className="text-xl mb-6 ">
            Join our platform and become part of a global community of
            educators. Whether you're an experienced teacher or passionate about
            sharing knowledge, eduManage offers the tools to create and manage
            your own courses, while making a lasting impact on students’ lives.
          </p>
          <Link to="/teach">
            <Button
              variant="contained"
              color="primary"
              className="hover:bg-blue-700 transition duration-300"
            >
              Start Teaching Today!
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinAsTeacher;
