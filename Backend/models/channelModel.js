const mongoose = require('mongoose')
const Schema = mongoose.Schema

const channelSchema = new mongoose.Schema({
  channel_id: {
    type: Number,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  channel_name: {
    type: String, 
    allowNull: false,
    unique: false,
  },
  channel_subscribe: {
    type: Number,
    allowNull: false,
  },
  channel_email: {
    type: String,
    allowNull: false,
    unique: true,
  },
  channel_img: {
    // type: String,
    allowNull: false,
    unique: true,
  },
  channel_video_cnt: {
    type: Number,
    allowNull: false
  },
})

const channelModel = mongoose.model("channel", channelSchema)

module.exports = channelModel;