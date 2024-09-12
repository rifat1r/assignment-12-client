import Swal from "sweetalert2";
import Class from "../../Components/Class";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUploadImage from "../../hooks/useUploadImage";

const AddClass = () => {
  const { uploadImage } = useUploadImage();
  const axiosSecure = useAxiosSecure();
  const handlePost = async (data) => {
    // console.log("form data", data);

    const imageFile = data.image[0];
    if (imageFile) {
      const imageURL = await uploadImage(imageFile);
      console.log("imageURL", imageURL);
      data.image = imageURL;
      console.log("modified", data);
      if (imageURL) {
        const res = await axiosSecure.post("/class", data);
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            timer: 1500,
            title: "Class Uploaded Successfully",
            showConfirmButton: false,
          });
        }
      } else {
        console.log("image was not uploaded");
      }
    }
  };

  return <Class setFormData={handlePost}></Class>;
};

export default AddClass;
