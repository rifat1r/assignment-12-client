const FilterByPrice = ({ setPriceRange }) => {
  const handlePriceRange = (e) => {
    e.preventDefault();
    const min = e.target.min.value;
    const max = e.target.max.value;
    setPriceRange({ min: min, max: max });
  };
  return (
    <dialog
      id="my_modal_22"
      className="modal  modal-bottom md:modal-middle w-72 mx-auto"
    >
      <div className="modal-box  ">
        <h2 className="text-center text-xl font-medium  text-blue-500">
          Price Range
        </h2>
        <form onSubmit={handlePriceRange}>
          <div className="grid grid-cols-1 gap-3  ">
            <label className="form-control mx-auto w-full">
              <div className="label">
                <span className="label-text">Min</span>
              </div>
              <input
                name="min"
                type="number"
                required
                className="input input-bordered bg-slate-200 input-sm "
              />
            </label>

            <label className="form-control mx-auto w-full">
              <div className="label">
                <span className="label-text">Max</span>
              </div>
              <input
                name="max"
                type="number"
                required
                className="input input-bordered bg-slate-200 input-sm"
              />
            </label>
          </div>
          <div className="text-end mt-5">
            <button
              type="submit"
              className="btn btn-ghost btn-sm btn-outline rounded-3xl text-blue-600"
            >
              APPLY
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default FilterByPrice;
