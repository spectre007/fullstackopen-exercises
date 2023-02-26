import PropTypes from 'prop-types'
import React from 'react'

export const LoginForm = ({ credentials, setCredentials, onLogin }) => {
  return (
    <form onSubmit={onLogin}>
      <div>
        username
        <input
          id='username'
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
          id='password'
          type='password'
          value={credentials.password}
          name='Password'
          onChange={({ target }) => {
            setCredentials({ ...credentials, password: target.value })
          }}
        />
      </div>
      <button id='login-button' type="submit">
        login
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  credentials: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  setCredentials: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
}