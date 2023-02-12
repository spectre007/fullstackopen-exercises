import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, ownedByUser }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = () => {
    blog.likes += 1
    updateBlog(blog)
    setLikes(blog.likes)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} &nbsp;
        <button style={hideWhenVisible} onClick={toggleVisibility}>view</button>
        <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          {likes}
          <button onClick={addLike}>like</button>
        </div>
        <div>{blog.user?.name}</div>
        <button
          style={{ display: ownedByUser ? '' : 'none' }}
          onClick={() => deleteBlog(blog)}
        >remove</button>
      </div>
    </div>
  )
}

export default Blog