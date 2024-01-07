import BrokenPokeball from "../assets/pokeball-broke.jpg"

const ErrorPage = () => {
  return (
    <div
      style={{ backgroundImage: `url(${BrokenPokeball})` }}
      className="h-screen bg-center bg-cover flex items-center justify-center"
    >
      <h1
        className="text-white text-4xl"
        style={{ textShadow: "0 0 10px #000" }}
      >
        Unknown Error Occurred. Please try refreshing the page.
      </h1>
    </div>
  )
}

export default ErrorPage
