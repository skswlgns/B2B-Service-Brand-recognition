const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new mongoose.Schema({
  company_id: {
    type: Schema.Types.ObjectId,
    ref: 'company',
    required: true
  },
  channel_id: {
    type: Schema.Types.ObjectId,
    ref: 'channel',
    required: true
  }
})

const ContactModel = mongoose.model('contact', contactSchema)

module.exports = ContactModel
