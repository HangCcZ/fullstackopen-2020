const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SUCCESS_NOTIFICATION":
      return action.data
    case "FAIL_NOTIFICATION":
      return action.data
    case "CLEAR_NOTIFICATION":
      return ""
    default:
      return state
  }
}

export const errorMessage = (message) => {
  return {
    type: "FAIL_NOTIFICATION",
    data: message,
  }
}

export const successMessage = (message) => {
  return {
    type: "SUCCESS_NOTIFICATION",
    data: message,
  }
}

export const clearMessage = () => {
  return {
    type: "CLEAR_NOTIFICATION",
  }
}

export default notificationReducer
