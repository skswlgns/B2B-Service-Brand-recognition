const mongoose = require('mongoose')
const Schema = mongoose.Schema

const videoSchema = new mongoose.Schema({
  video_id: {
    type: Number,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  video_title: {
    type: String,
    allowNull: false,
  },
  video_views: {
    type: Number,
    allowNull: false,
  },
  video_ban: {
    type: Boolean,
    allowNull: false,
  },
  video_like: {
    type: Number,
    allowNull: false,
  },
  video_dislike: {
    type: Number, 
    allowNull: false,
  },
  video_date: {
    type: String,
    allowNull: false
  },
  video_content: {
    type: String,
    allowNull: false,
  },
  video_url: {
    type: String,
    allowNull: false,
    unique: true,
  },
  video_thumbnails: {
    type: String, 
    allowNull: false,
  },
  video_time: {
    type: Number,
    allowNull: false,
  },
  video_record: {
    type: Object,
    allowNull: true,
  },
  channel_id: {
    type: Schema.Types.ObjectId,
    ref: "channel",
    required: true,
  }
})

const videoModel = mongoose.model("video", videoSchema)

module.exports = videoModel;