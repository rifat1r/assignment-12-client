import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import ReviewCard from "../../../Components/ReviewCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const Reviews = () => {
  const axiosPublic = useAxiosPublic();
  const { data: feedbacks = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/reviews");
      return res.data;
    },
  });
  return (
    <div className="max-w-7xl mx-auto">
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          // Adjust slidesPerView and space for medium screens
          768: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          // Adjust for small screens
          425: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 1,
          },
        }}
        modules={[Pagination]}
        className="mySwiper "
      >
        {feedbacks.map((feedback) => (
          <SwiperSlide key={feedback._id}>
            <ReviewCard
              className="flex items-center"
              feedback={feedback}
            ></ReviewCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
