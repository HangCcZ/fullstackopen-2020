import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlogChange = (event) => {
    switch (event.target.name) {
      case 'title':
        setTitle(event.target.value)
        break
      case 'author':
        setAuthor(event.target.value)
        break
      case 'url':
        setUrl(event.target.value)
        break
      default:
        break
    }
  }

  const clearBlogFields = () => {
    setTitle('')
    setUrl('')
    setAuthor('')
  }
  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    createBlog(newBlog)
    clearBlogFields()
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type='text'
            value={title}
            name='title'
            onChange={handleNewBlogChange}
          />
        </div>

        <div>
          author:
          <input
            type='text'
            value={author}
            name='author'
            onChange={handleNewBlogChange}
          />
        </div>

        <div>
          url:
          <input
            type='text'
            value={url}
            name='url'
            onChange={handleNewBlogChange}
          />
        </div>

        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm
