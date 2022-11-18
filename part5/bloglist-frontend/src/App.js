import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { LoginForm } from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [credentials, setCredentials] = useState({username: '', password: ''})
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setCredentials({username: '', password: ''})
    } catch (exception) {
      setErrorMessage('Wrong credentials!')
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
  }

  const handleLogout = () => {
    if (user) {
      window.localStorage.removeItem('loggedUser')
      setUser(null)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
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
      <p>{user.name} logged in<button type='button' onClick={handleLogout}>logout</button></p>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
