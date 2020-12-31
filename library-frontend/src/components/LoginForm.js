import { useMutation } from "@apollo/client"
import React, { useState, useEffect } from "react"
import { LOGIN } from "../mutations"
const LoginForm = ({ setToken, setLoginClick }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setLoginClick(false)
      setToken(token)
      localStorage.setItem("book-user-token", token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </div>
        <div>
          password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </div>
        <button type='submit'>SUBMIT</button>
      </form>
    </div>
  )
}

export default LoginForm
