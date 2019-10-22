const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

mongoose
  .connect(config.mongoUrl)
  .then(() => {
    console.log('connected to database', config.mongoUrl)
  })
  .catch((error) => {
    console.log(error)
  })

const app = express()
const entryRouter = require('./controllers/entries')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.get('/', (request, response) => {
  response.send('<h1>ALMS-log backend</h1>')
})

app.use(cors())
app.use(middleware.logger)
app.use(middleware.tokenExtractor)
app.use(bodyParser.json())
app.use('/api/entries', entryRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

const PORT = config.port

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
