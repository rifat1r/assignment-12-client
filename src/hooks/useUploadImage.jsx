import useAxiosPublic from "../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMGBB_PK;

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const useUploadImage = () => {
  const axiosPublic = useAxiosPublic();

  const uploadImage = async (img) => {
    const imageFile = { image: img };
    //upload the image then get url
    if (img) {
      const imgRes = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      console.log("upload image works------", imgRes.data);
      return imgRes.data.data.display_url;
    }
    return () => {
      console.log("image not found");
    };
  };
  return { uploadImage };
};

export default useUploadImage;
