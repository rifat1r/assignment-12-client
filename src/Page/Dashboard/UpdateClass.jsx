import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUploadImage from "../../hooks/useUploadImage";
import Class from "../../Components/Class";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import SectionTitle from "../../Components/SectionTitle";

const UpdateClass = ({ id, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const modalRef = useRef(null);
  const { data: aClass = {} } = useQuery({
    queryKey: ["id", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/class/${id}`);
      return res.data;
    },
  });
  const { uploadImage } = useUploadImage();
  const handleUpdateClass = async (data) => {
    if (data.image.length > 0) {
      const imageFile = data.image[0];
      const imageURL = await uploadImage(imageFile);
      if (imageURL) {
        data.image = imageURL;
      }
    } else {
      delete data.image;
    }

    console.log("id----->", id);
    data.techerImg = user.photoURL;
    const res = await axiosSecure.patch(`/class/${id}`, data);
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        icon: "success",
        timer: 1500,
        title: "Class Updated Successfully",
        showConfirmButton: false,
      });
      modalRef.current.close();
    }
  };

  return (
    <dialog ref={modalRef} id="my_modal_4" className="modal">
      <div className="modal-box w-11/12 max-w-3xl">
        <SectionTitle subHeading={"Edit Your class"}></SectionTitle>
        <Class
          getFormData={handleUpdateClass}
          action={"Update Class"}
          aClass={aClass}
          id={id}
        ></Class>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default UpdateClass;
