const Loading = ({ show }) => {
  return show ? (
    <div className="text-center text-xl font-bold animate-pulse">
      Loading...
    </div>
  ) : null
}

export default Loading
