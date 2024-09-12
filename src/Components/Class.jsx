import { useForm } from "react-hook-form";
import { MdAddToPhotos } from "react-icons/md";
import useAuth from "../hooks/useAuth";

const Class = ({ setFormData }) => {
  const { user } = useAuth();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setFormData(data);
    reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-5 w-full lg:w-3/4 mx-auto">
          <div className="form-control">
            <label className="input input-bordered flex items-center gap-2">
              Name :
              <input
                {...register("name", { required: true })}
                defaultValue={user?.displayName}
                type="text"
                className="grow"
                placeholder="type here"
                readOnly
              />
            </label>
          </div>
          <div className="form-control">
            <label className="input input-bordered flex items-center gap-2">
              Email :
              <input
                {...register("email", { required: true })}
                defaultValue={user?.email}
                type="text"
                className="grow"
                readOnly
                placeholder="type here"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="input input-bordered flex items-center gap-2">
              Price :
              <input
                {...register("price", { required: true })}
                type="number"
                className="grow"
                placeholder="type here"
              />
            </label>
            {errors.price && (
              <p className="text-red-500 text-xl">Price is required</p>
            )}
          </div>
          <div className="form-control">
            <label className="input input-bordered flex items-center gap-2">
              Title :
              <input
                {...register("title", { required: true })}
                type="text"
                className="grow"
                placeholder="type here"
              />
            </label>
            {errors.title && (
              <p className="text-red-500 text-xl">Title is required</p>
            )}
          </div>
          <div className="form-control col-span-2">
            <label className="textarea textarea-bordered flex items-start gap-2 ">
              Description :
              <textarea
                {...register("description", { required: true })}
                type="text"
                className=" grow"
                placeholder="type here"
              />
            </label>
            {errors.description && (
              <p className="text-red-500 text-xl">Description is required</p>
            )}
          </div>
          <div>
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input file-input-bordered file-input-accent w-full max-w-xs"
            />
            {errors.image && (
              <p className="text-red-500 text-xl">Image is required</p>
            )}
          </div>
          <button className="btn">
            <MdAddToPhotos></MdAddToPhotos>
            Add Class
          </button>
        </div>
      </form>
    </div>
  );
};

export default Class;
