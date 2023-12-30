const ErrorMessage = ({ message }) => {
  return message ? <p className="my-5 text-red-400">{message}</p> : null
}

export default ErrorMessage
