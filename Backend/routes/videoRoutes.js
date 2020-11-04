// library
const express = require('express')

// Model
const VideoModel = require('../models/VideoModel')
const CompanyModel = require('../models/CompanyModel')
const ExposureModel = require('../models/ExposureModel')

// Routes
const videoRoutes = express.Router()

// 변수
const admin_id = '5fa21b49bf786c138c6062ee'

// API
// 비디오 데이터 삽입
videoRoutes.post('/', async (req, res) => {
  try {
    if (req.headers.company_id === admin_id) {
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
      const videoCategory = req.body.video_category

      const item = new VideoModel({
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
        video_category: videoCategory
      })
      await item.save()

      // exposure model에 video record 저장하자
      if (req.body.video_record) {
        const record = req.body.video_record

        for (let i = 0; i < record.length; i++) {
          // console.log(record[i])
          const videoExposure = await ExposureModel.findOne({
            _id: record[i].company_id
          })

          // if (videoExposure && videoExposure.exposure_date === req.body.video_date) {
          //   videoExposure.exposure_time += record[i].total_exposure_time
          // }

          console.log(videoExposure)
          console.log('===============')
        }

        // const videoExposureTime = req.body.video
      }
      // exposure_date
      // req.body.video_record
      res.status(200).send({
        message: '성공적으로 데이터를 삽입하였습니다.'
      })
    } else {
      res.status(400).send({
        message: '관리자가 아닙니다.'
      })
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

// 전체 비디오 조회
videoRoutes.get('/', async (req, res) => {
  if (req.headers.token) {
    try {
      const videoAll = await VideoModel.find()
      res.status(200).send(videoAll)
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(403).send({ message: '회원만 비디오를 조회할 수 있습니다.' })
  }
})

// 아이디 값으로 하나의 비디오 조회
videoRoutes.get('/:video_id', async (req, res) => {
  if (req.headers.token) {
    const videoId = req.params.video_id
    try {
      const videoOne = await VideoModel.findOne({ _id: videoId })
      res.status(200).send(videoOne)
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(403).send({ message: '회원만 비디오를 조회할 수 있습니다.' })
  }
})

// 비디오 스크랩
videoRoutes.put('/scrap', async (req, res) => {
  if (req.headers.token) {
    try {
      const companyId = req.headers.company_id
      const videoId = req.body._id

      const company = await CompanyModel.findOne({
        _id: companyId
      })

      const video = await VideoModel.findOne({
        _id: videoId
      })

      if (!company.company_video.includes(videoId)) {
        company.company_video.push(videoId)
        await CompanyModel.findOneAndUpdate({ _id: companyId }, { company_video: company.company_video })

        video.scrap_company_id.push(companyId)
        await VideoModel.findOneAndUpdate({ _id: videoId }, { scrap_company_id: video.scrap_company_id })

        res.status(200).send({ message: '비디오를 스크랩하였습니다.' })
      } else {
        company.company_video.remove(videoId)
        await CompanyModel.findOneAndUpdate({ _id: companyId }, { company_video: company.company_video })

        video.scrap_company_id.remove(companyId)
        await VideoModel.findOneAndUpdate({ _id: videoId }, { scrap_company_id: video.scrap_company_id })
        res.status(200).send({ message: '비디오 스크랩을 취소하였습니다.' })
      }
    } catch (err) {
      res.status(500).send(err)
    }
  }
})

// 비디오 통계 제외
videoRoutes.put('/exception', async (req, res) => {
  if (req.headers.token) {
    try {
      const companyId = req.headers.company_id
      const videoId = req.body._id

      const company = await CompanyModel.findOne({
        _id: companyId
      })

      const video = await VideoModel.findOne({
        _id: videoId
      })

      if (!company.company_exception.includes(videoId)) {
        if (company.company_video.includes(videoId)) {
          company.company_video.remove(videoId)
        }
        company.company_exception.push(videoId)
        await CompanyModel.findOneAndUpdate(
          { _id: companyId },
          {
            company_exception: company.company_exception,
            company_video: company.company_video
          }
        )

        video.exception_company_id.push(companyId)
        await VideoModel.findOneAndUpdate({ _id: videoId }, { exception_company_id: video.exception_company_id })

        res.status(200).send({ message: '해당 비디오를 통계에서 제외시킵니다.' })
      } else {
        company.company_exception.remove(videoId)
        await CompanyModel.findOneAndUpdate(
          { _id: req.headers.company_id },
          { company_exception: company.company_exception }
        )

        video.exception_company_id.remove(companyId)
        await VideoModel.findOneAndUpdate({ _id: videoId }, { exception_company_id: video.exception_company_id })
        res.status(200).send({ message: '해당 비디오 제외를 취소합니다.' })
      }
    } catch (err) {
      res.status(500).send(err)
    }
  }
})

// 비디오 삭제
videoRoutes.delete('/', async (req, res) => {
  if (req.headers.company_id === admin_id) {
    try {
      const videoId = req.body._id
      const temp = await VideoModel.findOne({ _id: videoId })
        .populate('scrap_company_id')
        .populate('exception_company_id')

      // companyModel의 company_video삭제
      for (let i = 0; i < temp.scrap_company_id.length; i++) {
        temp.scrap_company_id[i].company_video.remove(videoId)
        await CompanyModel.findOneAndUpdate(
          { _id: temp.scrap_company_id[i]._id },
          { company_video: temp.scrap_company_id[i].company_video }
        )
      }

      // companyModel의 company_exception 삭제
      for (let j = 0; j < temp.exception_company_id.length; j++) {
        temp.exception_company_id[j].company_exception.remove(videoId)
        await CompanyModel.findOneAndUpdate(
          { _id: temp.exception_company_id[j]._id },
          { company_exception: temp.exception_company_id[j].company_exception }
        )
      }

      await VideoModel.deleteOne({ _id: videoId })
      res.status(200).send({ message: '비디오를 삭제하였습니다.' })
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(403).send({ message: '관리자만 삭제할 수 있습니다.' })
  }
})

module.exports = videoRoutes
