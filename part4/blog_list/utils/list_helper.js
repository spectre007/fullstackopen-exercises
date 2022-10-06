let _ = require('lodash')


// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((prev, blog) => prev + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}

  const { title, author, likes } = blogs.reduce((prev, curr) => {
    return prev.likes > curr.likes ? prev : curr
  })
  return (title && author && !!likes) ? { title, author, likes } : {}
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}
  return _.chain(blogs)
    .countBy('author')
    .toPairs()
    .map(([k, v]) => ({ author: k, blogs: v }))
    .maxBy('blogs')
    .value()
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}

