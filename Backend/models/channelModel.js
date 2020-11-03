const mongoose = require('mongoose')
const Schema = mongoose.Schema

const channelSchema = new mongoose.Schema({
  channel_name: {
    type: String,
    allowNull: false,
    unique: false
  },
  channel_subscribe: {
    type: Number,
    allowNull: false
  },
  channel_email: {
    type: String,
    allowNull: false,
    unique: true
  },
  channel_img: {
    type: String,
    allowNull: false
  },
  channel_video_cnt: {
    type: Number,
    allowNull: false
  },
  channel_youtube_id: {
    type: String,
    allowNull: false
  },
  scrap_company_id: [
    {
      type: Schema.Types.Object,
      ref: 'company'
    }
  ],
  contact_company_id: [
    {
      type: Schema.Types.Object,
      ref: 'company'
    }
  ]
})

const ChannelModel = mongoose.model('channel', channelSchema)

module.exports = ChannelModel
