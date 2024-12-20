import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
// In your index.js or App.js
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight, FaBookOpen } from "react-icons/fa6";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useRef } from "react";
import { IconButton } from "@mui/material";

const Teachers = () => {
  const { setClassByTeacher } = useOutletContext();
  const navigate = useNavigate();
  const handleTeacher = (teacher) => {
    setClassByTeacher(teacher.email);
    navigate(`/classByTeacher/${teacher.email}`);
  };
  const axiosPublic = useAxiosPublic();
  const { data: teachers = [], isPending: loading } = useQuery({
    queryKey: ["allTeachers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/teachers");
      return res.data;
    },
  });
  const sliderRef = useRef(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  if (loading) {
    return (
      <div className="flex justify-center mt-36">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="slider-container max-w-7xl mx-auto ">
      <div className="relative">
        <div className=" absolute left-5 top-60 z-10">
          <IconButton
            sx={{
              color: "white",
              background: "gray",
            }}
            size="large"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            {" "}
            <FaArrowLeft></FaArrowLeft>
          </IconButton>
        </div>
        <div className="absolute z-10 right-5 top-60">
          <IconButton
            sx={{
              color: "white",
              background: "gray",
            }}
            size="large"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <FaArrowRight></FaArrowRight>
          </IconButton>
        </div>
      </div>

      {teachers.length > 0 && (
        <Slider ref={sliderRef} {...settings}>
          {teachers.map((teacher) => (
            <div key={teacher._id} className="p-4 h-full ">
              <img
                src={teacher.image}
                alt={teacher.name || "Teacher"}
                className="w-full h-[320px] lg:h-[430px] object-cover"
              />
              <div className="p-2 text-center">
                <h3 className="text-2xl font-bold text-gray-600 mb-1">
                  {teacher.name}
                </h3>
                <p className="text-lg  text-gray-600">{teacher.title}</p>
                <p className="text-gray-400 text-sm">
                  <span className="font-medium"></span> {teacher.category}
                </p>
                <button
                  onClick={() => handleTeacher(teacher)}
                  className="btn mt-2 btn-outline border-0 border-b-2 btn-sm bg-slate-400 bg-opacity-30 "
                >
                  View Classes
                  <FaBookOpen className="  " />
                </button>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Teachers;
