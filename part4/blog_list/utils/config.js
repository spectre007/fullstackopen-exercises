require('dotenv').config()

const PORT = process.env.PORT // eslint-disable-line no-undef
const MONGODB_URI = process.env.MONGODB_URI // eslint-disable-line no-undef

module.exports = {
  MONGODB_URI,
  PORT
}
