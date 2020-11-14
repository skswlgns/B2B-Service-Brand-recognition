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
  channel_avg_views: {
    type: Number,
    allowNull: false,
    default: 0
  },
  channel_category: {
    type: String,
    allowNull: false,
    default: 'IT'
  },
  four_week_subs: {
    type: Array,
    default: [0, 0, 0, 0]
  },
  four_week_views: {
    type: Array,
    default: [0, 0, 0, 0]
  },
  scrap_company_id: [
    {
      type: Schema.Types.ObjectId,
      ref: 'company'
    }
  ],
  contact_company_id: [
    {
      type: Schema.Types.ObjectId,
      ref: 'company'
    }
  ]
})

const ChannelModel = mongoose.model('channel', channelSchema)

module.exports = ChannelModel
