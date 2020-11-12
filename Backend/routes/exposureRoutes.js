// // library
const express = require('express')
const CompanyModel = require('../models/CompanyModel')

// // Model
const ExposureModel = require('../models/ExposureModel')

// // Routes
const exposureRoutes = express.Router()

// // API

// // 모든 기록 데이터 조회
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

// // 기업별 기록 데이터 조회
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

module.exports = exposureRoutes
