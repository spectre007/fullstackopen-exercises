import React from 'react'

export const LoginForm = ({credentials, setCredentials, onLogin}) => {
  return (
    <form onSubmit={onLogin}>
      <div>
        username
        <input
          type='text'
          value={credentials.username}
          name='Username'
          onChange={({ target }) => {
            setCredentials({ ...credentials, username: target.value })
          }}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={credentials.password}
          name='Password'
          onChange={({ target }) => {
            setCredentials({ ...credentials, password: target.value })
          }}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}
