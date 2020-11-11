import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"
import { useDispatch, useSelector } from "react-redux"
import {
  createBlog,
  deleteBlog,
  likeBlog,
  initializeBlogs,
  clearBlogs,
} from "./reducers/blogReducer"

import { loginUser, logoutUser, userFromToken } from "./reducers/userReducer"
import { fetchAllUsers } from "./reducers/usersReducer"
import {
  errorMessage,
  successMessage,
  clearMessage,
} from "./reducers/notificationReducer"

import { Switch, Route, useRouteMatch, Link } from "react-router-dom"
import UserList from "./components/UserList"
import Header from "./components/Header"
import User from "./components/User"
const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const notification = useSelector((state) => state.notification)

  const match = useRouteMatch("/users/:id")
  const matchBlog = useRouteMatch("/blogs/:id")
  const individualUser = match
    ? users.find((user) => user.id === match.params.id)
    : null
  const individualBlog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null

  // uncontrolled form here
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(userFromToken(user))
      dispatch(initializeBlogs())
      dispatch(fetchAllUsers())
    }
  }, [dispatch])

  const handleLogOut = async (event) => {
    window.localStorage.removeItem("loggedBlogUser")
    dispatch(logoutUser())
    dispatch(clearBlogs())
    setUsername("")
    setPassword("")
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      dispatch(loginUser(username, password))
      dispatch(initializeBlogs())
      setUsername("")
      setPassword("")
    } catch (exception) {
      dispatch(errorMessage("Wrong username or password"))
      setTimeout(() => {
        dispatch(clearMessage())
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    try {
      dispatch(createBlog(blogObject))

      blogFormRef.current.toggleVisibility()

      dispatch(
        successMessage(
          `a new blog ${blogObject.title} by ${blogObject.author} created`
        )
      )
      setTimeout(() => {
        dispatch(clearMessage())
      }, 3000)
    } catch (exception) {
      dispatch(errorMessage("Error creating a new blog "))
    }
  }

  const addLike = (blogObject) => {
    try {
      dispatch(likeBlog(blogObject))
    } catch (exception) {
      dispatch(errorMessage("error updating the vlog"))
      setTimeout(() => {
        dispatch(clearMessage())
      }, 3000)
    }
  }

  const removeBlog = async (blogObject) => {
    try {
      dispatch(deleteBlog(blogObject))
    } catch (exception) {
      dispatch(errorMessage(`error deleting the vlog, error: ${exception}`))
      setTimeout(() => {
        dispatch(clearMessage())
      }, 3000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          id='username'
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>

      <div>
        password
        <input
          type='password'
          id='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type='submit'>
        login
      </button>
    </form>
  )
  const blogForm = () => (
    <Togglable
      buttonLabel='new blog'
      className='newBlogToggle'
      ref={blogFormRef}
    >
      <div>
        <button onClick={handleLogOut}>Logout</button>
        <BlogForm createBlog={addBlog} />
      </div>
    </Togglable>
  )

  const showUserBlogs = () => (
    <div>
      <Header handleLogOut={handleLogOut} />
      {blogForm()}
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          // <Blog
          //   key={blog.id}
          //   blog={blog}
          //   clickLike={addLike}
          //   removeBlog={removeBlog}
          //   user={user}
          // />
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
    </div>
  )

  const renderUserList = () => {
    return (
      <div>
        <Header handleLogOut={handleLogOut} />
        <UserList />
      </div>
    )
  }

  const renderUserPanel = () => {
    return (
      <div>
        <Header handleLogOut={handleLogOut} />
        <User user={individualUser} />
      </div>
    )
  }

  const renderSingleBlog = () => {
    return (
      <div>
        <Header handleLogOut={handleLogOut} />
        <Blog
          blog={individualBlog}
          clickLike={addLike}
          removeBlog={removeBlog}
          user={user}
        />
      </div>
    )
  }

  return (
    <div>
      <Notification message={notification} />
      <Switch>
        <Route path='/users/:id'>{renderUserPanel()}</Route>

        <Route exact path='/users'>
          {renderUserList()}
        </Route>

        <Route path='/blogs/:id'>{renderSingleBlog()}</Route>

        <Route exact path='/'>
          {user === null ? loginForm() : showUserBlogs()}
        </Route>
      </Switch>
    </div>
  )
}

export default App
