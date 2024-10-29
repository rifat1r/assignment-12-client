import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { MdOutlinePendingActions } from "react-icons/md";

const Status = ({ status }) => {
  return (
    <div>
      {status ? (
        status === "approved" ? (
          <div className="badge text-green-700 gap-2 text-sm">
            <FaCheck />
            Approved
          </div>
        ) : (
          <div className="badge text-red-700 gap-2 ">
            <ImCross />
            Rejected
          </div>
        )
      ) : (
        <div className="badge gap-2">
          <MdOutlinePendingActions />
          Pending
        </div>
      )}
    </div>
  );
};

export default Status;
