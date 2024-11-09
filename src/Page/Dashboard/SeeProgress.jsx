import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ReviewCard from "../../Components/ReviewCard";

const SeeProgress = () => {
  const { state } = useLocation();
  const axiosSecure = useAxiosSecure();
  const classId = state.classId;
  const { data: reviews = [] } = useQuery({
    queryKey: [classId, "feedback"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${classId}`);
      return res.data;
    },
  });
  return (
    <div>
      <p>Feedback : {reviews.length}</p>
      <div>
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review}></ReviewCard>
        ))}
      </div>
    </div>
  );
};

export default SeeProgress;
