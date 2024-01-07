export const reducerFunc = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + action.payload }
    case "DECREMENT":
      return { count: state.count - action.payload }
    default:
      return state
  }
}

export const initialState = {
  count: 0,
}
