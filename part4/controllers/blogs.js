const blogsRouter = require('express').Router()
const { request, response } = require('express')
const Blog = require('../models/blog')

//      / =  /api/blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog=>blog.toJSON()))
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
  response.status(201).json(saveResponse.toJSON())
})

blogsRouter.delete('/:id',async (request,response)=>{
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id',async(request,response)=>{
  const body = request.body
  const updatedBlog = {
    title:body.title,
    author:body.author,
    url:body.url,
    likes:body.likes
  }
  const newBlog = await Blog.findByIdAndUpdate(request.params.id,updatedBlog,{new:true})

  response.json(newBlog.toJSON())
})

module.exports = blogsRouter
