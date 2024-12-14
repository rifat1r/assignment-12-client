import Swal from "sweetalert2";
import Class from "../../Components/Class";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUploadImage from "../../hooks/useUploadImage";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Components/SectionTitle";

const AddClass = () => {
  const { user } = useAuth();
  const { uploadImage } = useUploadImage();
  const axiosSecure = useAxiosSecure();
  const { data: teacherInfo = {} } = useQuery({
    queryKey: [user?.email, "teacherInfo"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacher/${user?.email}`);
      return res.data;
    },
  });
  console.log("teacher info", teacherInfo);
  const handlePost = async (data) => {
    console.log("addclass is triggered");

    const imageFile = data.image[0];
    if (imageFile) {
      const imageURL = await uploadImage(imageFile);
      console.log("imageURL", imageURL);
      data.image = imageURL;
      data.teacherImg = teacherInfo?.image;
      data.category = teacherInfo?.category;
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

  return (
    <div className="w-full lg:w-3/4 p-4">
      <SectionTitle className="" heading={"Add class"}></SectionTitle>
      <Class action={"Add Class"} getFormData={handlePost}></Class>
    </div>
  );
};

export default AddClass;
