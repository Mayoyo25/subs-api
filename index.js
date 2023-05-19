const express = require('express')
const app = express()
const cors = require('cors')
const connectDb = require('./db/ConnectDB')
const subscriptions = require('./routes/Routes')
const corsOptions = {
  origin: ['http://localhost:5173'],
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

require('dotenv').config()

//middleware
// app.use(express.json())
app.use(express.json({ limit: '1mb' }))
app.use('/api/v1/sub', subscriptions)

const uri = process.env.MONGO_URI || 5000

const port = process.env.PORT
const start = async () => {
  try {
    await connectDb(uri)
    app.listen(port, () => console.log('server is listening on port: ' + port))
  } catch (error) {
    console.log(error)
  }
}

start()
