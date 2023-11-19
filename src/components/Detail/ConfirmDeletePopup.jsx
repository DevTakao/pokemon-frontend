const ConfirmDeletePopup = (props) => {
  return (
    props.showBox && (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm"
        onClick={props.onClose}
      >
        <div className="box-border absolute items-center p-8 m-auto bg-white rounded shadow-md w-96">
          <h2 className="text-lg">
            Are you sure you want to delete this pokemon?
          </h2>
          <div className="flex justify-center mt-3">
            <button
              className="px-3 ml-2 text-lg border border-black rounded-full"
              onClick={props.onClose}
            >
              Close
            </button>
            <button
              className="px-3 ml-2 text-lg bg-red-400 border border-black rounded-full"
              onClick={props.onDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  )
}

export default ConfirmDeletePopup
