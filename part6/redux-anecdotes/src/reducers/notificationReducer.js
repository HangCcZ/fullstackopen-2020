const anecdoteReducer = (state = "Test Notification", action) => {
  switch (action.type) {
    case "ERROR":
      return action.data
    default:
      return state
  }
}

export default anecdoteReducer
