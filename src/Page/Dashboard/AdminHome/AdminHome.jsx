import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUploadImage from "../../../hooks/useUploadImage";

const AdminHome = () => {
  const { uploadImage } = useUploadImage();
  const axiosSecure = useAxiosSecure();
  const handleUpload = async (e) => {
    e.preventDefault();
    const imageFile = e.target.image.files[0];
    console.log("image", imageFile);
    if (imageFile) {
      const imageURL = await uploadImage(imageFile);
      const res = await axiosSecure.post("/bannerImage", {
        image: imageURL,
      });
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          timer: 1500,
          title: "Banner image Uploaded Successfully",
          showConfirmButton: false,
        });
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          required
          name="image"
          className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
        />
        <input className="btn btn-primary" type="submit" />
      </form>
    </div>
  );
};

export default AdminHome;
