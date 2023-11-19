const DeletePokemon = (props) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      onClick={props.onClose}
    >
      <div className="w-96 absolute items-center bg-white shadow-md rounded m-auto box-border p-8">
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
            className="bg-red-400 px-3 ml-2 text-lg border border-black rounded-full"
            onClick={props.onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletePokemon
