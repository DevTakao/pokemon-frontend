const ErrorMessage = ({ message }) => {
  return message ? (
    <span className="block my-5 py-1 px-7 bg-red-200 text-red-600 rounded-full mx-auto text-center">
      {message}
    </span>
  ) : null
}

export default ErrorMessage
