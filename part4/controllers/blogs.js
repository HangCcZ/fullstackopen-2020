const blogsRouter = require('express').Router()
const { request, response } = require('express')
const blog = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')
const usersRouter = require('./users')

//      / =  /api/blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.send(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  const newBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
    new: true,
  })

  response.json(newBlog.toJSON())
})

module.exports = blogsRouter
