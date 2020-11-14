const mongoose = require('mongoose')

const Schema = mongoose.Schema

const scrapVideoSchema = new mongoose.Schema({
  company_id: {
    type: Schema.Types.ObjectId,
    ref: 'company',
    required: true
  },

  video_id: {
    type: Schema.Types.ObjectId,
    ref: 'video',
    required: true
  }
})

const ScrapVideoModel = mongoose.model('scrapVideo', scrapVideoSchema)

module.exports = ScrapVideoModel
