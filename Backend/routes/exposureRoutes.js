// // library
const express = require('express')
const CompanyModel = require('../models/CompanyModel')

// // Model
const ExposureModel = require('../models/ExposureModel')

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
