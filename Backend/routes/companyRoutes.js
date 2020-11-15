// library
const express = require('express')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const secretObj = require('../config/jwt')

// Model
const CompanyModel = require('../models/CompanyModel')
const VideoModel = require('../models/VideoModel')
const ChannelModel = require('../models/ChannelModel')
const ExposureModel = require('../models/ExposureModel')

// Routes
const companyRoutes = express.Router()

// 변수
// const admin_id = '5fa21b49bf786c138c6062ee'

// 함수
const hashpassword = (password) => {
  return crypto.createHash('sha512').update(password).digest('hex')
}

// API

// 회원가입
companyRoutes.post('/signup', async (req, res) => {
  try {
    const companyEmail = req.body.company_email
    const companyPwd = req.body.company_pwd
    const companyNick = req.body.company_nickname
    const companyIndustry = req.body.company_industry

    const item = new CompanyModel({
      company_email: companyEmail,
      company_pwd: hashpassword(companyPwd),
      company_nickname: companyNick,
      company_industry: companyIndustry
    })
    await item.save()
    res.status(200).send({
      message: `${companyEmail} 회원가입이 완료되었습니다.`
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

// 로그인
companyRoutes.post('/signin', async (req, res) => {
  if (req.headers.token) {
    res.status(403).json({ message: '이미 로그인 되어있습니다.' })
  } else {
    const companyEmail = req.body.company_email
    const companyPwd = hashpassword(req.body.company_pwd)

    await CompanyModel.findOne({ company_email: companyEmail })
      .then((company) => {
        if (company.company_pwd !== companyPwd) {
          res.status(403).send({ message: '비밀번호가 다릅니다.' })
        } else {
          jwt.sign(
            { company_email: company.company_email },
            secretObj.secret,
            { expiresIn: '1d' },

            function (err, token) {
              if (err) {
                res.send(err)
              } else {
                res.json({
                  message: '로그인 성공, 토큰을 발급합니다.',
                  token: token,
                  status: 'login',
                  company_email: company.company_email,
                  company_id: company._id,
                  company_exception: company.company_exception,
                  company_video: company.company_video,
                  company_channel: company.company_channel,
                  company_contact: company.company_contact,
                  company_pwd: company.company_pwd,
                  company_nickname: company.company_nickname
                })
              }
            }
          )
        }
      })
      .catch(() => {
        res.status(403).send({
          message: '존재하지 않는 아이디입니다.'
        })
      })
  }
})

// 회원탈퇴
companyRoutes.delete('/', async (req, res) => {
  if (req.headers.company_id) {
    try {
      const companyId = req.headers.company_id
      const company = await CompanyModel.findOne({ _id: companyId })
      if (company === null) {
        res.status(403).send({ message: '존재하지 않는 회원입니다.' })
      } else {
        // video Cascade
        // 1. exception_video 내에 있는 video에 있는 company_id 지워주기!
        // 하나 이상일 때만 지워줘야 한다. (0개일 때는 지울필요 x)
        if (company.company_exception.length > 0) {
          for (let i = 0; i < company.company_exception.length; i++) {
            const video = await VideoModel.findOne({ _id: company.company_exception[i] })
            video.exception_company_id.remove(companyId)
            await VideoModel.findOneAndUpdate(
              { _id: company.company_exception[i] },
              { exception_company_id: video.exception_company_id }
            )
          }
        }
        // 2.scrap_video 내에 있는 video에 있는 company_id 지워주기
        if (company.company_video.length > 0) {
          for (let j = 0; j < company.company_video.length; j++) {
            const video_scrap = await VideoModel.findOne({ _id: company.company_video[j] })
            video_scrap.scrap_company_id.remove(companyId)
            await VideoModel.findOneAndUpdate(
              { _id: company.company_video[j] },
              { scrap_company_id: video_scrap.scrap_company_id }
            )
          }
        }
        // Channel Cascade
        // 1.scrap_company_id
        if (company.company_channel.length > 0) {
          for (let k = 0; k < company.company_channel.length; k++) {
            const channel_scrap = await ChannelModel.findOne({ _id: company.company_channel[k] })
            channel_scrap.scrap_company_id.remove(companyId)
            await ChannelModel.findOneAndUpdate(
              { _id: company.company_channel[k] },
              { scrap_company_id: channel_scrap.scrap_company_id }
            )
          }
        }
        // 2. contact_company_id
        if (company.company_contact.length > 0) {
          for (let l = 0; l < company.company_contact.length; l++) {
            const channel_contact = await ChannelModel.findOne({ _id: company.company_contact[l] })
            channel_contact.contact_company_id.remove(companyId)
            await ChannelModel.findOneAndUpdate(
              { _id: company.company_contact[l] },
              { contact_company_id: channel_contact.contact_company_id }
            )
          }
        }
        // exposure
        await ExposureModel.deleteMany({ company_id: companyId })

        // 진짜 회원탈퇴
        await CompanyModel.deleteOne({ _id: companyId })
        res.status(200).send({ message: '회원이 탈퇴되었습니다.' })
      }
    } catch (err) {
      res.status(500).send(err)
    }
  }
})

// 모든 회원조회
companyRoutes.get('/', async (req, res) => {
  if (req.headers.token) {
    try {
      const companyAll = await CompanyModel.find()
      res.status(200).send(companyAll)
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(403).send({ message: '접근이 제한되었습니다.' })
  }
})

// 스크랩 비디오 조회
companyRoutes.get('/video', async (req, res) => {
  if (req.headers.token) {
    try {
      const company = await CompanyModel.findOne({
        _id: req.headers.company_id
      }).populate('company_video')
      res.status(200).send(company)
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(403).send({ message: '로그인이 필요한 서비스입니다.' })
  }
})

// 스크랩 채널 조회
companyRoutes.get('/channel', async (req, res) => {
  if (req.headers.token) {
    try {
      const company = await CompanyModel.findOne({
        _id: req.headers.company_id
      }).populate('company_channel')
      res.status(200).send(company)
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(403).send({ message: '로그인이 필요한 서비스입니다.' })
  }
})

// 닉네임 조회
companyRoutes.get('/nick', async (req, res) => {
  if (req.headers.company_id) {
    const company = await CompanyModel.findOne({
      _id: req.headers.company_id
    })
    res.status(200).send(company.company_nickname)
  } else {
    res.status(403).send({ message: '로그인이 필요한 서비스입니다.' })
  }
})

// 카테고리 조회
companyRoutes.get('/industry', async (req, res) => {
  if (req.headers.company_id) {
    const company = await CompanyModel.findOne({
      _id: req.headers.company_id
    })
    res.status(200).send(company.company_industry)
  } else {
    res.status(403).send({ message: '로그인이 필요한 서비스입니다.' })
  }
})

// 컨택 채널 조회
companyRoutes.get('/contact', async (req, res) => {
  if (req.headers.token) {
    try {
      const company = await CompanyModel.findOne({
        _id: req.headers.company_id
      }).populate('company_contact')
      res.status(200).send(company.company_contact)
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(403).send({ message: '로그인이 필요한 서비스입니다.' })
  }
})

// 제외 영상 조회
companyRoutes.get('/exception', async (req, res) => {
  if (req.headers.token) {
    try {
      const company = await CompanyModel.findOne({ _id: req.headers.company_id }).populate('company_exception')
      res.status(200).send(company.company_exception)
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(403).send({ message: '회원만 조회할 수 있습니다.' })
  }
})

// 회원조회
companyRoutes.get('/:company_id', async (req, res) => {
  const companyId = req.params.company_id
  if (companyId === req.headers.company_id) {
    try {
      const companyOne = await CompanyModel.findOne({ _id: companyId })
      res.status(200).send(companyOne)
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(403).send({ message: '접근이 제한되었습니다.' })
  }
})

module.exports = companyRoutes
