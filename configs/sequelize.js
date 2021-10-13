const dotenv = require('dotenv')
const path = require('path')

if (!process.env.host) {
  dotenv.config({
    path: path.join(__dirname, "..", ".env")
  })
}

module.exports = {
  host: process.env.host,
  username: process.env.DEV_DB_USER,
  password: process.env.DEV_DB_PW,
  port: process.env.DEV_DB_PORT,
  database: process.env.DATABASE,
  dialect: 'mariadb'
}