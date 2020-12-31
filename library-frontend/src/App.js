import React, { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import Recommend from "./components/Recommend"
import { useApolloClient, useSubscription } from "@apollo/client"

const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  const [loginClick, setLoginClick] = useState(false)

  const client = useApolloClient()

  const renderContents = () => {
    return (
      <div>
        <Authors show={page === "authors"} />

        <Books show={page === "books"} />

        <NewBook show={page === "add"} />
        {token ? <Recommend show={page === "recommend"} /> : null}
      </div>
    )
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>

        {token ? (
          <div>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={() => logout()}>LOGOUT</button>
          </div>
        ) : (
          <button onClick={() => setLoginClick(!loginClick)}>
            {loginClick ? "BACK" : "LOGIN"}
          </button>
        )}

        {loginClick ? (
          <LoginForm setToken={setToken} setLoginClick={setLoginClick} />
        ) : (
          renderContents()
        )}
      </div>
    </div>
  )
}

export default App
