const DescriptionModal = ({ description }) => {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Description</h3>
        <p className="py-4 text-lg">{description}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default DescriptionModal;
