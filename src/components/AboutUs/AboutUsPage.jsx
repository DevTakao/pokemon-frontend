import { useReducer } from "react"
import { initialState, reducerFunc } from "./AboutUsReducer"

const AboutUsPage = () => {
  const [state, dispatch] = useReducer(reducerFunc, initialState)
  // Advantage 1: all state-related code can be abstracted (moved outside the component)
  // Advantage 2: easier to debug state conflicts
  // Advantage 3: better debugging in React dev tools

  return (
    <div className="max-w-screen-md py-10 mx-auto">
      <h1 className="mb-10 text-2xl font-bold text-center">
        Public Page (About Us)
      </h1>
      <p className="px-4">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste amet,
        facere dignissimos ea similique quidem necessitatibus, eveniet voluptas
        dolore sint consectetur consequuntur perferendis cum, a aspernatur id
        tempore dolorum dolorem?
      </p>

      <div className="hidden border border-black p-5">
        <div>
          <p>Count: {state.count}</p>
          <button
            className="bg-slate-400 p-3 mx-2"
            onClick={() => dispatch({ type: "INCREMENT", payload: 10 })}
          >
            Increment
          </button>
          <button
            className="bg-slate-400 p-3 mx-2"
            onClick={() => dispatch({ type: "DECREMENT", payload: 5 })}
          >
            Decrement
          </button>
        </div>
      </div>
    </div>
  )
}

export default AboutUsPage
