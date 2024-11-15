import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ReviewCard from "../../Components/ReviewCard";

const SeeProgress = () => {
  const { state } = useLocation();
  const axiosSecure = useAxiosSecure();
  const classId = state.classId;
  const { data: feedbacks = [] } = useQuery({
    queryKey: [classId, "feedback"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${classId}`);
      return res.data;
    },
  });
  return (
    <div>
      <p>Feedback : {feedbacks.length}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {feedbacks.map((feedback) => (
          <ReviewCard key={feedback._id} feedback={feedback}></ReviewCard>
        ))}
      </div>
    </div>
  );
};

export default SeeProgress;
