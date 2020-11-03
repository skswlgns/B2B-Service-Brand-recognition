// // library
const express = require('express')

// // Model
const ExposureModel = require('../models/ExposureModel')

// // Routes
const exposureRoutes = express.Router()

// // API

// // 모든 기록 데이터 조회
exposureRoutes.get('/', async (req, res) => {
  if (req.headers.token) {
    const exposureAll = await ExposureModel.find()
    res.status(200).send(exposureAll)
  } else {
    res.status(403).send({ message: '로그인이 필요한 서비스입니다.' })
  }
})

// // 기업별 기록 데이터 조회
// channelRoutes.get("/company", async(req, res) => {

// })

// // 산업별 기록 데이터 조회
// channelRoutes.get("/industry", async(req, res) => {

// })

module.exports = exposureRoutes
