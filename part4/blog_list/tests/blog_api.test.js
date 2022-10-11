const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared entries in blog test database')

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier property "id" is defined', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('a new blog can be added', async () => {
  const newBlog = {
    title: 'A Blog Title',
    author: 'A. Nonymous',
    url: 'https://example.com',
    likes: 1,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfterInsert = await helper.blogsInDb()
  expect(blogsAfterInsert).toHaveLength(helper.initialBlogs.length + 1)

  const blogTitles = blogsAfterInsert.map((b) => b.title)
  expect(blogTitles).toContain(newBlog.title)
})

test('missing likes are defaulted to zero', async () => {
  const newBlog = {
    title: 'A Blog with zero likes',
    author: 'Z. Row',
    url: 'localhost'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogsAfterInsert = await helper.blogsInDb()
  const insertedBlog = blogsAfterInsert.find((b) => b.title === newBlog.title)
  expect(insertedBlog.likes).toBe(0)
})

afterAll(() => {
  mongoose.connection.close()
})
