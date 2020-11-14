// library
const express = require('express')

// Model
const VideoModel = require('../models/VideoModel')
const CompanyModel = require('../models/CompanyModel')
const ExposureModel = require('../models/ExposureModel')
const ChannelModel = require('../models/ChannelModel')

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
            company_id: record[i].company_id,
            exposure_date: req.body.video_date
          })

          // video 날짜에 기업 노출 기록이 있으면 더하고
          if (videoExposure) {
            videoExposure.exposure_time += record[i].total_exposure_time
            await ExposureModel.findOneAndUpdate(
              { company_id: record[i].company_id, exposure_date: req.body.video_date },
              { exposure_time: videoExposure.exposure_time }
            )
          } else {
            const videoDate = req.body.video_date
            const videoExposureTime = record[i].total_exposure_time
            const company_id = record[i].company_id

            const item = new ExposureModel({
              exposure_date: videoDate,
              exposure_time: videoExposureTime,
              company_id: company_id
            })
            await item.save()
          }

          const company = await CompanyModel.findOne({ _id: record[i].company_id })
          company.company_total_time += record[i].total_exposure_time

          await CompanyModel.findOneAndUpdate(
            { _id: record[i].company_id },
            { company_total_time: company.company_total_time }
          )
        }
      }
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

// 비디오 count & time
videoRoutes.get('/count', async (req, res) => {
  if (req.headers.token) {
    try {
      const companyId = req.headers.company_id
      const videoCount = await VideoModel.find().count()
      const videoAll = await VideoModel.find()
      let companyCount = 0
      let companyTime = 0
      for (let i = 0; i < videoCount; i++) {
        if (videoAll[i].video_record.length > 0) {
          let flag = false
          for (let j = 0; j < videoAll[i].video_record.length; j++) {
            console.log(companyTime)
            if (videoAll[i].video_record[j].company_id === companyId) {
              companyTime = companyTime + videoAll[i].video_record[j].total_exposure_time
              if (flag === false) {
                companyCount = companyCount + 1
                flag = true
              }
            }
            flag = false
          }
        }
      }
      const companyData = {
        companyCount: companyCount,
        companyTime: companyTime
      }
      res.status(200).send(companyData)
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(403).send({ message: '회원만 비디오를 조회할 수 있습니다.' })
  }
})

// 무한스크롤 비디오 조회
videoRoutes.get('/infinity', async (req, res) => {
  if (req.headers.token) {
    try {
      const videoAll = await VideoModel.find({ _id: req.headers.company_id })
      res.status(200).send(videoAll.slice(req.headers.limit, req.headers.limit + 4))
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
        await CompanyModel.findOneAndUpdate({ _id: companyId }, { company_exception: company.company_exception })

        video.exception_company_id.remove(companyId)
        await VideoModel.findOneAndUpdate({ _id: videoId }, { exception_company_id: video.exception_company_id })
        res.status(200).send({ message: '해당 비디오 제외를 취소합니다.' })
      }
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(403).send({ message: '회원만 비디오 통계를 제외할 수 있습니다.' })
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

// Youtube Id 값으로 하나의 비디오 조회
videoRoutes.get('/youtube/:video_youtube_id', async (req, res) => {
  // if (req.headers.token) {
  const videoYoutubeId = req.params.video_youtube_id
  try {
    const video = await VideoModel.findOne({ video_youtube_id: videoYoutubeId })
    // console.log(video.video_record)
    for (let index = 0; index < video.video_record.length; index++) {
      const companyId = video.video_record[index].company_id
      const company = await CompanyModel.findOne({ _id: companyId })
      video.video_record[index].company_id = company
    }
    res.status(200).send(video)
  } catch (err) {
    res.status(500).send(err)
  }
  // } else {
  //   res.status(403).send({ message: '회원만 비디오를 조회할 수 있습니다.' })
  // }
})

// 유튜브 채널 아이디로 전체 비디오 조회
videoRoutes.get('/videos/:video_youtube_id', async (req, res) => {
  if (req.headers.token) {
    const videoYoutubeId = req.params.video_youtube_id
    const limit = req.headers.limit
    try {
      const channel = await ChannelModel.findOne({ channel_youtube_id: videoYoutubeId })
      let videos = await VideoModel.find({ channel_id: channel._id })
      videos = videos.slice(limit, limit + 4)

      for (let videoIndex = 0; videoIndex < videos.length; videoIndex++) {
        const video = videos[videoIndex]
        let real_total = 0
        for (let recordIndex = 0; recordIndex < video.video_record.length; recordIndex++) {
          real_total = real_total + video.video_record[recordIndex].total_exposure_time
          const companyId = video.video_record[recordIndex].company_id
          const company = await CompanyModel.findOne({ _id: companyId })
          video.video_record[recordIndex].company_id = company
        }
        video.video_total = real_total
      }
      res.status(200).send(videos)
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(403).send({ message: '로그인이 필요한 서비스입니다.' })
  }
})
module.exports = videoRoutes
