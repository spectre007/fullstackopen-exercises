const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { author, title, url, likes } = request.body
  const { user } = request

  const blog = new Blog({
    author,
    title,
    url,
    likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const { author, title, url, likes } = request.body
  const blog = { author, title, url, likes }
  Object.keys(blog).forEach(key => blog[key] === undefined && delete blog[key])

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  if (updatedBlog) response.json(updatedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  const { user } = request
  const { _id: userid } = user

  if ( blog.user.toString() === userid.toString() ) {
    await blog.remove()
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'unauthorized user' })
  }
})

module.exports = blogsRouter

