const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "DISPLAY":
      return `you voted ${action.data.anecdote.content}`
    case "REMOVE_DISPLAY":
      return null
    default:
      return state
  }
}

export const displayNotification = (anecdote) => {
  return {
    type: "DISPLAY",
    data: { anecdote },
  }
}

export const removeNotification = () => {
  return { type: "REMOVE_DISPLAY", data: {} }
}

export default notificationReducer
