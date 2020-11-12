const mongoose = require('mongoose')
const Schema = mongoose.Schema

const videoSchema = new mongoose.Schema({
  video_title: {
    type: String,
    allowNull: false
  },
  video_views: {
    type: Number,
    allowNull: false
  },
  video_like: {
    type: Number,
    allowNull: false
  },
  video_dislike: {
    type: Number,
    allowNull: false
  },
  video_date: {
    type: String,
    allowNull: false
  },
  video_content: {
    type: String,
    allowNull: false
  },
  video_url: {
    type: String,
    allowNull: false,
    unique: true
  },
  video_thumbnails: {
    type: String,
    allowNull: false
  },
  video_time: {
    type: Number,
    allowNull: false
  },
  video_record: {
    type: Object,
    allowNull: true
  },
  video_youtube_id: {
    type: String,
    allowNull: false
  },
  video_industry: {
    type: String,
    allowNull: false
  },
  video_category: {
    type: String,
    allowNull: false
  },
  video_total: {
    type: Number
  },
  channel_id: {
    type: Schema.Types.ObjectId,
    ref: 'channel',
    required: true
  },
  scrap_company_id: [
    {
      type: Schema.Types.Object,
      ref: 'company'
    }
  ],
  exception_company_id: [
    {
      type: Schema.Types.Object,
      ref: 'company'
    }
  ]
})

const VideoModel = mongoose.model('video', videoSchema)

module.exports = VideoModel
