// library
const express = require('express')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const secretObj = require('../config/jwt')

// Model
const CompanyModel = require('../models/CompanyModel')

// Routes
const companyRoutes = express.Router()

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
                  company_execption: company.company_execption,
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

// 로그아웃
// companyRoutes.post("/signout", async (req, res) => {
// 	// console.log(req.headers)
// 	if (req.headers.token == null) {
// 		res.status(403).json({ message: "로그인 되어 있지 않습니다." })
// 	} else {

// 	}
// })

// 회원탈퇴
// companyRoutes.delete("/", verificationMiddleware)
companyRoutes.delete('/delete', async (req, res) => {
  try {
    await CompanyModel.findOne({ company_id: req.headers._id }).then(
      async (company) => {
        if (company === null) {
          res.status(403).send({ message: '존재하지 않는 아이디 입니다.' })
        } else {
          // 다른 모델에서도 회원 정보를 지워줘야 한다.
          await CompanyModel.deleteOne({ company_email: company.company_email })
          res.status(200).send({ message: '회원 탈퇴 되었습니다.' })
        }
      }
    )
  } catch (err) {
    res.status(500).send(err)
  }
})

// 모든 회원조회
companyRoutes.get('/', async (req, res) => {
  if (req.headers.company_id === '5f9bc574c52fb15df02d54f2') {
    try {
      const companyAll = await CompanyModel.find()
      res.status(200).send(companyAll)
    } catch (err) {
      res.status(500).send(err)
    }
  }
})

// 비디오 스크랩 조회
companyRoutes.get('/video', async (req, res) => {
  if (req.headers.token) {
    try {
      const scrapVideo = await CompanyModel.findOne({
        _id: req.headers.company_id
      })
      console.log(scrapVideo)
    } catch (err) {
      res.status(500).send(err)
    }
  }
})

// 스크랩 채널 조회
companyRoutes.get('/channel', async (req, res) => {
  try {
    const company = await CompanyModel.findOne({
      _id: req.headers.company_id
    }).populate('company_channel')
    res.status(200).send(company)
  } catch (err) {
    res.status(500).send(err)
  }
})

// 컨택 채널 조회
companyRoutes.get('/contact', async (req, res) => {
  try {
    const company = await CompanyModel.findOne({
      _id: req.headers.company_id
    }).populate('company_contact')
    res.status(200).send(company.company_contact)
  } catch (err) {
    res.status(500).send(err)
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
  }
})

module.exports = companyRoutes
