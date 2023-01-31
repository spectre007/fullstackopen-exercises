import { useEffect, useState } from 'react'
import Blog from './components/Blog'
import { LoginForm } from './components/LoginForm'
import { Notification } from './components/Notification'
import './index.css'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({author: '', title: '', url: ''})
  const [credentials, setCredentials] = useState({username: '', password: ''})
  const [user, setUser] = useState(null)
  const [statusMessage, setStatusMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(credentials)
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setCredentials({username: '', password: ''})
    } catch (error) {
      setStatusMessage({text: 'wrong username or password', type: 'error' })
      setTimeout(() => setStatusMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    if (user) {
      window.localStorage.removeItem('loggedUser')
      setUser(null)
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const response = await blogService.create(newBlog)
      setBlogs(blogs.concat(response))
      setNewBlog({author: '', title: '', url: ''})
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
      <p>{user.name} logged in<button type='button' onClick={handleLogout}>logout</button></p>
      
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
      <div>
        title:
        <input
          type='text'
          value={newBlog.title}
          name='title'
          onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
        />
      </div>
      <div>
        author:
        <input
          type='text'
          value={newBlog.author}
          name='author'
          onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
        />
      </div>
      <div>
        url:
        <input
          type='text'
          value={newBlog.url}
          name='url'
          onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
        />
      </div>
      <button type='submit'>create</button>
    </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
