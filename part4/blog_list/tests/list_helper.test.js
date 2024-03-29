const listHelper = require('../utils/list_helper')

const BLOGS = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const listWithOneBlog = [ BLOGS[0] ]
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(listWithOneBlog[0].likes)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(BLOGS)
    expect(result).toBe(36)
  })
})

describe('favoriteBlog', () => {
  test('of an empty list is an empty object', () => {
    const result = listHelper.favoriteBlog([])
    expect(Object.entries(result).length).toBe(0)
  })

  test('when list has only one blog equals the only blog', () => {
    const listWithOneBlog = [ BLOGS[0] ]
    const reference = (({ title, author, likes }) => ({ title, author, likes }))(listWithOneBlog[0])
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(reference)
  })

  test('of a bigger list is determined correctly', () => {
    const result = listHelper.favoriteBlog(BLOGS)
    const reference = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    expect(result).toEqual(reference)
  })
})

describe('mostBlogs', () => {
  test('of an empty list is an empty object', () => {
    const result = listHelper.mostBlogs([])
    expect(Object.entries(result).length).toBe(0)
  })

  test('when list has only one blog equals to that author and blogs', () => {
    const listWithOneBlog = [ BLOGS[0] ]
    const reference = {
      author: 'Michael Chan',
      blogs: 1,
    }
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual(reference)
  })

  test('of a bigger list is determined correctly', () => {
    const reference = {
      author: 'Robert C. Martin',
      blogs: 3,
    }
    const result = listHelper.mostBlogs(BLOGS)
    expect(result).toEqual(reference)
  })
})

describe('mostLikes', () => {
  test('of an empty list is an empty object', () => {
    const result = listHelper.mostLikes([])
    expect(Object.entries(result).length).toBe(0)
  })

  test('when a list has only one blog equals to that author and likes', () => {
    const listWithOneBlog = [ BLOGS[0] ]
    const reference = {
      author: 'Michael Chan',
      likes: 7,
    }
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual(reference)
  })

  test('of a bigger list is determined correctly', () => {
    const result = listHelper.mostLikes(BLOGS)
    const reference = {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    }
    expect(result).toEqual(reference)
  })
})
