const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//      / =  /api/blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  const saveResponse = await blog.save()
  console.log(saveResponse)
  response.status(201).json(saveResponse)
})

module.exports = blogsRouter
