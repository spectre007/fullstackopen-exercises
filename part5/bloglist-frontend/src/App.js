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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login(credentials)
      setUser(user)
      setCredentials({username: '', password: ''})
    } catch (exception) {
      setErrorMessage('Wrong credentials!')
      setTimeout(() => {setErrorMessage(null)}, 5000)
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
      <p>{user.name} logged in</p>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
