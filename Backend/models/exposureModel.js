const mongoose = require('mongoose')
const Schema = mongoose.Schema

const exposureSchema = new mongoose.Schema({
  exposure_date: {
    type: String,
    allowNull: false
  },
  exposure_time: {
    type: Number,
    allowNull: false
  },
  company_id: {
    type: Schema.Types.ObjectId,
    ref: 'company',
    required: true
  }
})

const ExposureModel = mongoose.model('exposure', exposureSchema)

module.exports = ExposureModel
