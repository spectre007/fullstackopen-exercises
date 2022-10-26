const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})


describe('when fetching all blogs', () => {
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
})

describe('viewing a specific blog', () => {
  test('succeeds with valid id', async () => {
    const blogsBeforeGet = await helper.blogsInDb()
    const blogToView = blogsBeforeGet[0]

    const returnedBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlog = JSON.parse(JSON.stringify(blogToView))
    expect(returnedBlog.body).toEqual(processedBlog)
  })

  test('fails with statuscode 404 if note does not exist', async () => {
    const nonExistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${nonExistingId}`)
      .expect(404)
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
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

  test('automatically sets missing likes to zero', async () => {
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

  test('fails for a blog without title', async () => {
    const blogWithoutTitle = {
      author: 'Dr. No',
      url: 'localhost:3000/blog',
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400)

    const blogsAfterPost = await helper.blogsInDb()
    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length)
  })

  test('fails for a blog without url', async () => {
    const blogWithoutURL = {
      title: 'Who needs URLs anyway?',
      author: 'Dr. No',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutURL)
      .expect(400)

    const blogsAfterPost = await helper.blogsInDb()
    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length)
  })
})

describe('updating a blog', () => {
  test('with a new number of likes succeeds', async () => {
    const blogsBeforeUpdate = await helper.blogsInDb()
    const blogToUpdate = blogsBeforeUpdate[0]
    const newLikes = { likes: 77 }

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newLikes)
      .expect(200)

    expect(updatedBlog.body).toEqual({ ...blogToUpdate, ...newLikes })
  })
})

describe('deletion of a blog', () => {
  test('succeeds if id is valid', async () => {
    const blogsBeforeDelete = await helper.blogsInDb()
    const blogToDelete = blogsBeforeDelete[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAfterDelete = await helper.blogsInDb()
    expect(blogsAfterDelete).toHaveLength(helper.initialBlogs.length - 1)
    const allTitles = blogsAfterDelete.map((b) => b.title)
    expect(allTitles).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
