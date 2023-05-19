const Data = require('../models/Schemas')

// Create new subscription data
const postData = async (req, res) => {
  // console.log(req.body)
  // res.send('done')
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
}
// Get all subscription data
const getData = async (req, res) => {
  try {
    const subscriptions = await Data.find({})
    res.json(subscriptions)
  } catch (e) {
    console.error(e)
    res
      .status(500)
      .json({ error: 'An error occurred while getting subscriptions.' })
  }
}

// Get a single subscription by ID
const getSingle = async (req, res) => {
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
}

// Update a single subscription by ID
const updateSingle = async (req, res) => {
  try {
    const subscription = await Data.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
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
}

// Delete a single subscription by ID
const deleteSingle = async (req, res) => {
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
}

module.exports = {
  postData,
  getData,
  getSingle,
  updateSingle,
  deleteSingle,
}
