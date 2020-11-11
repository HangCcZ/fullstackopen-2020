import loginService from "../services/login"
import blogService from "../services/blogs"

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "SUCCESS":
      return action.data.user
    case "TOKEN_USER":
      return action.data.user
    case "FAIL" || "SIGNOUT":
      return null
    default:
      return state
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: "SUCCESS",
        data: { user },
      })
    } catch (exception) {
      dispatch({ type: "FAIL" })
    }
  }
}

export const logoutUser = () => {
  return {
    type: "SIGNOUT",
  }
}

export const userFromToken = (user) => {
  blogService.setToken(user.token)
  return {
    type: "TOKEN_USER",
    data: { user },
  }
}

export default userReducer
