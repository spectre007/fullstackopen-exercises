import { useEffect, useRef, useState } from 'react'
import { Blog } from './components/Blog'
import { BlogForm } from './components/BlogForm'
import { LoginForm } from './components/LoginForm'
import { Notification } from './components/Notification'
import { Togglable } from './components/Togglable'
import './index.css'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [user, setUser] = useState(null)
  const [statusMessage, setStatusMessage] = useState(null)
  const formRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [blogs.length])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(credentials)
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setCredentials({ username: '', password: '' })
    } catch (error) {
      setStatusMessage({ text: 'wrong username or password', type: 'error' })
      setTimeout(() => setStatusMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    if (user) {
      window.localStorage.removeItem('loggedUser')
      setUser(null)
    }
  }

  const addBlog = async (newBlog) => {
    try {
      const response = await blogService.create(newBlog)
      setBlogs(blogs.concat(response))
      formRef.current.toggleVisibility()
      setStatusMessage({
        text: `a new blog ${response.title} by ${response.author} added`,
        type: 'info',
      })
      setTimeout(() => setStatusMessage(null), 5000)
    } catch (error) {
      console.log(error.name)
      console.log(error.message)
    }
  }

  const updateBlog = async (updatedBlog) => {
    try {
      await blogService.update(updatedBlog)
    } catch (error) {
      console.log(error.name)
      console.log(error.message)
    }
  }

  const deleteBlog = async (blog_) => {
    try {
      if (window.confirm(`Remove blog ${blog_.title} by ${blog_.author}`)) {
        await blogService.remove(blog_)
        setBlogs(blogs.filter((b) => b.id !== blog_.id))
      }
    } catch (error) {
      console.log(error.name)
      console.log(error.message)
    }
  }

  const compareLikes = (a, b) => {
    if (a.likes === b.likes) {
      return 0
    }
    return Math.sign(b.likes - a.likes)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification status={statusMessage} />
        <LoginForm
          credentials={credentials}
          setCredentials={setCredentials}
          onLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification  status={statusMessage} />
      <p>{user.name} logged in
        <button className='btn-logout' type='button' onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel={'new blog'} ref={formRef}>
        <BlogForm onSubmit={addBlog} />
      </Togglable>

      {blogs.sort(compareLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          ownedByUser={blog.user?.username === user.username}
        />
      )}
    </div>
  )
}

export default App
