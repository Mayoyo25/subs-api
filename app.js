const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const Data = require('./models/Schemas')
const MONGO_URI =
  'mongodb+srv://mayoyo:JvM8Fg8GrZhVYVfJ@nodeproject.ahhrtl8.mongodb.net/SUBS?retryWrites=true&w=majority'
mongoose.connect(MONGO_URI)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
  console.log('MongoDB connected.')
  start()
})

function start() {
  const app = express()
  app.use(express.json())
  app.use(cors())

  // Create new subscription data
  app.post('/subscriptions', async (req, res) => {
    try {
      const subscription = new Data(req.body)
      const savedSubscription = await subscription.save()
      res.status(201).json(savedSubscription)
    } catch (e) {
      console.error(e)
      res
        .status(500)
        .json({ error: 'An error occurred while creating a subscription.' })
    }
  })

  // Get all subscription data
  app.get('/subscriptions', async (req, res) => {
    try {
      const subscriptions = await Data.find({})
      res.json(subscriptions)
    } catch (e) {
      console.error(e)
      res
        .status(500)
        .json({ error: 'An error occurred while getting subscriptions.' })
    }
  })

  // Get a single subscription by ID
  app.get('/subscriptions/:id', async (req, res) => {
    try {
      const subscription = await Data.findById(req.params.id)
      if (!subscription) {
        return res.status(404).json({ error: 'Subscription not found.' })
      }
      res.json(subscription)
    } catch (e) {
      console.error(e)
      res
        .status(500)
        .json({ error: 'An error occurred while getting a subscription.' })
    }
  })

  // Update a single subscription by ID
  app.patch('/subscriptions/:id', async (req, res) => {
    try {
      const subscription = await Data.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      )
      if (!subscription) {
        return res.status(404).json({ error: 'Subscription not found.' })
      }
      res.json(subscription)
    } catch (e) {
      console.error(e)
      res
        .status(500)
        .json({ error: 'An error occurred while updating a subscription.' })
    }
  })

  // Delete a single subscription by ID
  app.delete('/subscriptions/:id', async (req, res) => {
    try {
      const subscription = await Data.findByIdAndDelete(req.params.id)
      if (!subscription) {
        return res.status(404).json({ error: 'Subscription not found.' })
      }
      res.sendStatus(204)
    } catch (e) {
      console.error(e)
      res
        .status(500)
        .json({ error: 'An error occurred while deleting a subscription.' })
    }
  })

  const port = 5000
  app.listen(port, () => {
    console.log(`Server listening on port ${port}.`)
  })
}
