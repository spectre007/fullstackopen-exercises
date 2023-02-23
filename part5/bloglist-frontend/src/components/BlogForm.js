import PropTypes from 'prop-types'
import { useState } from 'react'

export const BlogForm = ({ onSubmit }) => {
  const [blog, setBlog] = useState({ author: '', title: '', url: '' })

  const handleCreate = (event) => {
    event.preventDefault()
    onSubmit(blog)
    setBlog({ author: '', title: '', url: '' })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            type='text'
            value={blog.title}
            name='title'
            onChange={({ target }) => setBlog({ ...blog, title: target.value })}
            placeholder='add title...'
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={blog.author}
            name='author'
            onChange={({ target }) => setBlog({ ...blog, author: target.value })}
            placeholder='add author...'
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={blog.url}
            name='url'
            onChange={({ target }) => setBlog({ ...blog, url: target.value })}
            placeholder='add url...'
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}