const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return `you voted ${action.data.text}`
    case "HIDE_NOTIFICATION":
      return null
    default:
      return state
  }
}

export const showNotification = (text) => {
  return {
    type: "SHOW_NOTIFICATION",
    data: { text },
  }
}

export const hideNotification = () => {
  return { type: "HIDE_NOTIFICATION" }
}

let timer = null
export const setNotification = (text, duration = 10) => {
  return (dispatch) => {
    dispatch(showNotification(text))

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => dispatch(hideNotification()), duration * 1000)
  }
}

export default notificationReducer
