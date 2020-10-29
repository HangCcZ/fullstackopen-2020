const filterReducer = (state = "", action) => {
  console.log(action)
  switch (action.type) {
    case "FILTER":
      return action.data.value
    default:
      return state
  }
}

export const addFilter = (value) => {
  return {
    type: "FILTER",
    data: {
      value,
    },
  }
}

export default filterReducer
