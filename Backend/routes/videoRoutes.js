// library
const express = require('express')

// Model
const videoModel = require('../models/videoModel')

// Routes 
const videoRoutes = express.Router()

// API 
// 비디오 데이터 삽입
videoRoutes.post('/', async (req, res) => {
  if (req.headers.company_id === "5f9bc574c52fb15df02d54f2") {
    try {
      const videoId = req.body.video_id
      const videoUrl = req.body.video_url
      const channelId = req.body.channel_id
      const videoYoutubId = req.body.video_youtube_id
      const videoTitle = req.body.video_title
      const videoContent = req.body.video_content
      const videoViews = req.body.video_views
      const videoLike = req.body.video_like
      const videoDisLike = req.body.video_dislike
      const videoDate = req.body.video_date
      const videoRecord = req.body.video_record
      const videoThumbnail = req.body.video_thumbnails
      const videoTime = req.body.video_time

      const item = new videoModel({
        video_id: videoId,
        video_url: videoUrl,
        channel_id: channelId,
        video_youtube_id: videoYoutubId,
        video_title: videoTitle,
        video_content: videoContent,
        video_views: videoViews,
        video_like: videoLike,
        video_dislike: videoDisLike,
        video_date: videoDate,
        video_record: videoRecord,
        video_thumbnails: videoThumbnail,
        video_time: videoTime,
      })
      await item.save()
      res.status(200).send({
        message: "성공적으로 데이터를 삽입하였습니다."
      })
    } catch (err) {
      res.status(500).send(err)
    } 
  }
})

module.exports = videoRoutes;