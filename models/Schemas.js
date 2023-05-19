const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subscriptionFee: {
    type: Number,
    required: true,
    min: 0,
  },
  billed: {
    type: String,
    default: 'monthly',
  },
  info: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Regular expression to validate a string as a valid CSS color code
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v)
      },
      message: (props) => `${props.value} is not a valid CSS color code!`,
    },
  },
  startDate: {
    type: String,
    required: true,
    // Custom validator function to check that the startDate is a valid date string in mm/dd/yyyy format
    validate: {
      validator: function (v) {
        const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
        if (!dateRegex.test(v)) {
          return false
        }
        const [_, month, day, year] = dateRegex.exec(v)
        const date = new Date(`${year}-${month}-${day}`)
        return date instanceof Date && !isNaN(date)
      },
      message: (props) =>
        `${props.value} is not a valid date in mm/dd/yyyy format!`,
    },
  },
  endDate: {
    type: String,
    required: true,
    // Custom validator function to check that the endDate is a valid date string in mm/dd/yyyy format
    validate: {
      validator: function (v) {
        const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
        if (!dateRegex.test(v)) {
          return false
        }
        const [_, month, day, year] = dateRegex.exec(v)
        const date = new Date(`${year}-${month}-${day}`)
        return date instanceof Date && !isNaN(date)
      },
      message: (props) =>
        `${props.value} is not a valid date in mm/dd/yyyy format!`,
    },
  },
  pieColors: new mongoose.Schema({
    pathColor: {
      type: String,
      default: 'red',
      validate: {
        validator: function (v) {
          // Regular expression to validate a string as a valid CSS color code
          return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v)
        },
        message: (props) => `${props.value} is not a valid CSS color code!`,
      },
    },
    textColor: {
      type: String,
      default: 'blue',
      validate: {
        validator: function (v) {
          // Regular expression to validate a string as a valid CSS color code
          return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v)
        },
        message: (props) => `${props.value} is not a valid CSS color code!`,
      },
    },
    trailColor: {
      type: String,
      default: 'gray',
      validate: {
        validator: function (v) {
          // Regular expression to validate a string as a valid CSS color code
          return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v)
        },
        message: (props) => `${props.value} is not a valid CSS color code!`,
      },
    },
  }),
})

const Data = mongoose.model('data', subscriptionSchema)

module.exports = Data
