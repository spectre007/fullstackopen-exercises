// eslint-disable-next-line no-unused-vars
const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const pattern = /^(bearer|Bearer)\s+([A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*)$/
  const authorization = request.get('authorization')

  if (authorization && pattern.test(authorization)) {
    request.token = authorization.match(pattern)[2]
  }

  next()
}

module.exports = {
  errorHandler,
  tokenExtractor,
}
