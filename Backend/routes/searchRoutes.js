// library
const express = require('express')
const ChannelModel = require('../models/ChannelModel')

// model
const VideoModel = require('../models/VideoModel')
// const ChannelModel = require('../models/ChannelModel')

// Routes
const searchRoutes = express.Router()

// API

// 검색
searchRoutes.get('/:content', async (req, res) => {
  if (req.headers.token) {
    const content = req.params.content
    try {
      const videos = await VideoModel.find({ video_title: { $regex: content } })
      const channels = await ChannelModel.find({ channel_name: { $regex: content } })
      const searchData = { videos: videos, channels: channels }
      res.status(200).send(searchData)
    } catch (err) {
      res.status(500).send(err)
    }
  }
})

module.exports = searchRoutes
