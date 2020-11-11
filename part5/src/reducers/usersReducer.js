import usersService from "../services/users"

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.data.users
    default:
      return state
  }
}

export const fetchAllUsers = () => {
  return async (dispatch) => {
    const users = await usersService.fetchUsers()
    dispatch({
      type: "FETCH_ALL",
      data: { users },
    })
  }
}

export default usersReducer
