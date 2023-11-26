const TestForm = () => {
  function handleSubmit(formData) {
    console.log("formData", formData)
  }

  return (
    <div className="p-10 my-10 border border-gray-300">
      <h2 className="my-5 text-xl font-medium text-center">Change Password</h2>
      <form action={handleSubmit} className="flex flex-col gap-4">
        <input
          name="firstInput"
          className="px-6 py-2 border-2 border-red-300 rounded-full"
          type="text"
          placeholder="Write something"
        />
        <button
          type="submit"
          className="self-center inline-block px-5 py-2 mr-5 text-white bg-pink-400 rounded-full"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default TestForm
