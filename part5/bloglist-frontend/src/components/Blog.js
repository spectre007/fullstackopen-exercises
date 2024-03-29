import PropTypes from 'prop-types'
import { useState } from 'react'

export const Blog = ({ blog, updateBlog, deleteBlog, ownedByUser }) => {
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
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author} &nbsp;
        <button style={hideWhenVisible} onClick={toggleVisibility} className='btn-view'>view</button>
        <button style={showWhenVisible} onClick={toggleVisibility} className='btn-hide'>hide</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div className='url'>{blog.url}</div>
        <div className='likes'>
          {likes}
          <button onClick={addLike} className="btn-like">like</button>
        </div>
        <div>{blog.user?.name}</div>
        <button
          className='btn-delete'
          style={{ display: ownedByUser ? '' : 'none' }}
          onClick={() => deleteBlog(blog)}
        >remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.object,
  }).isRequired,
  updateBlog: PropTypes.func,
  deleteBlog: PropTypes.func,
  ownedByUser: PropTypes.bool.isRequired,
}

Blog.defaultProps = {
  updateBlog: () => {},
  deleteBlog: () => {},
}