import { Button } from "@mui/material";
import { MdOutlineAddToPhotos } from "react-icons/md";
import AddAssignment from "./AddAssignment";
import { useParams } from "react-router-dom";

const MyClassDetails = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        <MdOutlineAddToPhotos className="mr-2 text-xl" />
        Create{" "}
      </Button>
      <AddAssignment classId={id}></AddAssignment>
    </div>
  );
};

export default MyClassDetails;
