const Data = require('../models/Schemas')

// Create new subscription data
const postData = async (req, res) => {
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
// update order
const updateOrder = async (req, res) => {
  // try {
  //   // Find the document by id
  //   const doc = await Data.findById(req.params.id)
  //   // Extract the array from the document using the relevant property
  //   const arrayToUpdate = doc.arrayToUpdate
  //   // Reorder the items in the array based on the updated order
  //   const updatedArray = req.body.updatedOrder
  //   // Update the array in the document
  //   doc.arrayToUpdate = updatedArray
  //   // Save the updated document to MongoDB
  //   await doc.save()
  //   // Send a success response
  //   res.status(200).json({ message: 'Array order updated successfully' })
  // } catch (error) {
  //   // Handle errors
  //   res.status(500).json({ error: error.message })
  // }
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
  updateOrder,
}
