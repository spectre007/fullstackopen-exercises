import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false)

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
          {blog.likes}
          <button onClick={addLike}>like</button>
        </div>
        <div>{blog.user?.name}</div>
      </div>
    </div>
  )
}

export default Blog