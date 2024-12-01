import { Rating, Stack } from "@mui/material";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const ReviewCard = ({ feedback }) => {
  const { rating, review, image, time, classTitle, name } = feedback;

  const formattedDate = new Date(time).toLocaleDateString();

  return (
    <div className="w-96 min-h-[500px] shadow-lg flex flex-col justify-between mx-auto">
      <div className="">
        <h2 className="text-2xl font-medium p-5">{classTitle}</h2>
        <div className="px-5">
          <Stack spacing={1}>
            <Rating
              size="large"
              name="half-rating-read"
              precision={0.2}
              value={rating}
              readOnly
            />
          </Stack>
        </div>
        <div>
          <FaQuoteLeft className="text-blue-500 text-3xl ml-4 mt-2" />
        </div>
        <p className="px-5 py-2">{review}</p>
        <div className="flex justify-end text-3xl mr-4">
          <FaQuoteRight className="text-blue-500 mb-3" />
        </div>
      </div>
      <div className="bg-sky-500 bg-opacity-70 flex justify-center items-center gap-5 py-4 ">
        <div className="avatar">
          <div className="mask mask-circle h-16 w-16">
            <img src={image} alt="Reviewer" />
          </div>
        </div>
        <div className="text-white">
          <h3 className="text-lg font-medium">{name}</h3>
          <p>{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
