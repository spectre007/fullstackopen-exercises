const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const extractJsonWebToken = (request) => {
  const pattern = /^(bearer|Bearer)\s+([A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*)$/
  const authorization = request.get('authorization')
  
  if (authorization && pattern.test(authorization)) {
    const match = authorization.match(pattern)[2]
    console.log(match)
    return match
  }
  return null
}

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

blogsRouter.post('/', async (request, response) => {
  const { author, title, url, likes } = request.body
  const token = extractJsonWebToken(request)

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!(decodedToken.id)) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

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

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter

