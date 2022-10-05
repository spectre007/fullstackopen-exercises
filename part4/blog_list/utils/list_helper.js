
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}

