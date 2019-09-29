const mongoose = require('mongoose')

const entrySchema = mongoose.Schema({
  date: {
    required: true,
    type: Date,
  },
  duration: {
    required: true,
    type: Number,
  },
  activity: {
    required: true,
    type: String,
  },
  focus: {
    required: true,
    type: String,
  },
  reflection: {
    required: true,
    type: String,
  },
  extra: {
    type: String,
  },
})

const Entry = mongoose.model('Entry', entrySchema)

module.exports = Entry
