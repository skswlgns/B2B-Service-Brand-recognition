// // library
const express = require('express')
const ChannelModel = require('../models/ChannelModel')
const CompanyModel = require('../models/CompanyModel')

// // Model
const ExposureModel = require('../models/ExposureModel')
const VideoModel = require('../models/VideoModel')

// // Routes
const exposureRoutes = express.Router()

// // API

// 모든 기록 데이터 조회
exposureRoutes.get('/', async (req, res) => {
  if (req.headers.token) {
    const exposureAll = await ExposureModel.find()
    // const exposureAll = await ExposureModel.aggregate([
    //   {
    //     $group: {
    //       _id: '$company_id'
    //     }
    //   }
    // ])

    res.status(200).send(exposureAll)
  } else {
    res.status(403).send({ message: '로그인이 필요한 서비스입니다.' })
  }
})

// 기업별 기록 데이터 조회
exposureRoutes.get('/company', async (req, res) => {
  if (req.headers.token) {
    try {
      const companyExposure = await ExposureModel.find({
        company_id: req.body.company_id
      })
      res.status(200).send(companyExposure)
    } catch (err) {
      res.status(400).send({ message: '존재하지 않는 기업입니다.' })
    }
  } else {
    res.status(403).send({ message: '로그인이 필요한 서비스입니다.' })
  }
})

// 산업별 기록 데이터 조회
exposureRoutes.get('/industry', async (req, res) => {
  if (req.headers.token) {
    try {
      const companyExposure = await CompanyModel.find({
        company_industry: req.body.company_industry
      })
      res.status(200).send(companyExposure)
    } catch (err) {
      res.status(400).send({ message: '존재하지 않는 산업입니다.' })
    }
  } else {
    res.status(403).send({ message: '로그인이 필요한 서비스입니다.' })
  }
})

// 내 브랜드 노출 순위 높은 영상
exposureRoutes.get('/topvideo', async (req, res) => {
  if (req.headers.token) {
    const videos = await VideoModel.find({})
    const topvideos = []

    for (let i = 0; i < videos.length; i++) {
      for (let j = 0; j < videos[i].video_record.length; j++) {
        if (videos[i].video_record[j].company_id === req.body.company_id) {
          topvideos.push({
            company: videos[i],
            time: videos[i].video_record[j].total_exposure_time
          })
        }
      }
    }
    topvideos.sort(function (a, b) {
      return b.time - a.time
    })
    res.status(200).send(topvideos.slice(0, 10))
  } else {
    res.status(403).send({ message: '로그인이 필요한 기능입니다.' })
  }
})

// 내 브랜드 노출 순위 높은 채널
exposureRoutes.get('/topchannel', async (req, res) => {
  if (req.headers.token) {
    const channels = await ChannelModel.find()
    const topchannels = []

    for (let i = 0; i < channels.length; i++) {
      // 내 채널 아이디 가진 비디오 전체 조회
      let summation = 0
      const videos = await VideoModel.find({ channel_id: channels[i]._id })
      for (let j = 0; j < videos.length; j++) {
        console.log(videos[j])
        for (let k = 0; k < videos[j].video_record.length; k++) {
          if (videos[j].video_record[k].company_id === req.body.company_id) {
            summation += videos[j].video_record[k].total_exposure_time
          }
        }
      }
      topchannels.push({
        channel: channels[i],
        time: summation
      })
    }

    topchannels.sort(function (a, b) {
      return b.time - a.time
    })
    res.status(200).send(topchannels.slice(0, 5))
  } else {
    res.status(403).send({ message: '로그인이 필요한 기능입니다.' })
  }
})

// 4주 기업 노출 시간
exposureRoutes.get('/fourweek', async (req, res) => {
  try {
    if (req.headers.token) {
      const exposures = await ExposureModel.find({
        company_id: req.body.company_id
      })

      let temp_1 = 0
      let temp_2 = 0
      let temp_3 = 0
      let temp_4 = 0

      for (let i = 0; i < exposures.length; i++) {
        if (exposures[i].exposure_date >= '2020-10-19' && exposures[i].exposure_date <= '2020-10-25') {
          temp_1 += exposures[i].exposure_time
        } else if (exposures[i].exposure_date >= '2020-10-26' && exposures[i].exposure_date <= '2020-11-01') {
          temp_2 += exposures[i].exposure_time
        } else if (exposures[i].exposure_date >= '2020-11-02' && exposures[i].exposure_date <= '2020-11-08') {
          temp_3 += exposures[i].exposure_time
        } else if (exposures[i].exposure_date >= '2020-11-09' && exposures[i].exposure_date <= '2020-11-15') {
          temp_4 += exposures[i].exposure_time
        }
      }
      // [4주차, 3주차, 2주차, 1주차]
      const result = [temp_1, temp_2, temp_3, temp_4]
      const company = await CompanyModel.findOneAndUpdate({ _id: req.body.company_id }, { company_four_week: result })
      res.status(200).send(company)
    } else {
      res.status(403).send({ message: '로그인이 필요한 기능입니다. ' })
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = exposureRoutes
