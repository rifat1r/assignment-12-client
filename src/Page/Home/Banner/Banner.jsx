import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

const Banner = () => {
  const axiosPublic = useAxiosPublic();
  const { data: bannerImage = [], isPending: loading } = useQuery({
    queryKey: ["bannerImage"],
    queryFn: async () => {
      const res = await axiosPublic.get("/bannerImage");
      return res.data;
    },
  });
  console.log("banner image", bannerImage);
  if (loading) {
    return (
      <div className="flex justify-center mt-36">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto z-10">
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {bannerImage.map((item) => (
          <SwiperSlide key={item._id}>
            <img className="w-full lg:h-[640px]  mx-auto" src={item.image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
