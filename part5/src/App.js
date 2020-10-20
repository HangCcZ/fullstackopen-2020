import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const allBlogs = await blogService.getAll()
  //     setBlogs(allBlogs)
  //   }
  //   fetchData()
  // }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      fetchBlogs()
    }
  }, [])

  const handleLogOut = async (event) => {
    window.localStorage.removeItem('loggedBlogUser')
    console.log('logged out')
    setUser(null)
    setBlogs([])
  }

  const fetchBlogs = async () => {
    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      // user contains token
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setBlogs([])
      setUsername('')
      setPassword('')

      fetchBlogs()
    } catch (exception) {
      setErrorMessage('Wong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(returnedBlog))

      setErrorMessage(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} created`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage('Error creating a new blog ')
    }
  }

  const addLike = async (blogObject) => {
    try {
      const updatedBlog = await blogService.updateLikes(blogObject)
      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      )
    } catch (exception) {
      setErrorMessage(`error updating the vlog`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const removeBlog = async (blogObject) => {
    try {
      await blogService.deleteBlog(blogObject)
      setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))
    } catch (exception) {
      setErrorMessage(`error deleting the vlog, error: ${exception}`)
      setTimeout(() => {
        setErrorMessage(null)
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
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>

      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <div>
        <button onClick={handleLogOut}>Logout</button>
        <BlogForm createBlog={addBlog} />
      </div>
    </Togglable>
  )

  const showUserBlogs = () => (
    <div>
      <h2>Blogs</h2>
      <p>
        {user.name} logged in<button onClick={handleLogOut}>Logout</button>
      </p>

      {blogForm()}
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            clickLike={addLike}
            removeBlog={removeBlog}
            user={user}
          />
        ))}
    </div>
  )

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={errorMessage} />
      {user === null ? loginForm() : showUserBlogs()}
    </div>
  )
}

export default App
