import { useForm } from "react-hook-form";
import { MdAddToPhotos } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const Class = ({ getFormData, action, aClass, id }) => {
  const { user } = useAuth();
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (aClass) {
      setValue("price", aClass.price);
      setValue("title", aClass.title);
      setValue("description", aClass.description);
    }
  }, [aClass, setValue, id]);
  const onSubmit = async (data) => {
    data.price = parseInt(data.price);
    getFormData(data);
    reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1  md:grid-cols-2 gap-5 ">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name", { required: true })}
              defaultValue={user?.displayName}
              type="text"
              placeholder="Name"
              className="input input-bordered"
              readOnly
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", { required: true })}
              defaultValue={user?.email}
              type="text"
              className="input input-bordered"
              readOnly
              placeholder="type here"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              {...register("price", { required: true })}
              defaultValue={aClass?.price}
              type="number"
              className="input input-bordered"
              placeholder="Price"
            />
            {errors.price && (
              <p className="text-red-500 text-xl">Price is required</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              {...register("title", { required: true })}
              type="text"
              className="input input-bordered"
              placeholder="Title"
              defaultValue={aClass?.title}
            />
            {errors.title && (
              <p className="text-red-500 text-xl">Title is required</p>
            )}
          </div>
          <div className="form-control col-span-1 md:col-span-2">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              {...register("description", { required: true })}
              type="text"
              className="textarea textarea-bordered "
              placeholder="Description"
              defaultValue={aClass?.description}
            />

            {errors.description && (
              <p className="text-red-500 text-xl">Description is required</p>
            )}
          </div>
          <div className="form-control ">
            <label className="label">
              {id ? (
                <span className="label-text">
                  Select a new image (Optional)
                </span>
              ) : (
                <span className="label-text">Select an image</span>
              )}
            </label>

            <input
              {...register("image", { required: id ? false : true })}
              type="file"
              className="file-input file-input-bordered file-input-accent w-full max-w-xs"
            />
            {errors.image && (
              <p className="text-red-500 text-xl">Image is required</p>
            )}
          </div>{" "}
          <div className="my-9">
            <button className="btn btn-block ">
              <MdAddToPhotos></MdAddToPhotos>
              {action}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Class;
