// library
const express = require('express')
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const secretObj = require("../config/jwt")

// Model
const companyModel = require('../models/companyModel')

// Routes 
const companyRoutes = express.Router()

// 함수
const hashpassword = (password) => {
	return crypto.createHash("sha512").update(password).digest("hex")
}

// API
companyRoutes.get('/', async (req, res) => {
	console.log('접근완료')
})

// 회원가입
companyRoutes.post('/signup', async (req, res) => {
	const companyEmail = req.body.company_email
	const companyPwd = req.body.company_pwd
	const companyNick = req.body.company_nickname

	const item = new companyModel({
		company_email : companyEmail,
		company_pwd : hashpassword(companyPwd),
		company_nickname : companyNick,
	})
	await item.save()
	res.status(200).send({
		message: `${companyEmail} 회원가입이 완료되었습니다.`
	})
})

// 로그인
companyRoutes.post('/login', async (req, res) => {
	if (req.headers.token){
		res.status(403).json({ message: "이미 로그인 되어있습니다." })
	} else {
		const companyEmail = req.body.company_email
		const companyPwd = hashpassword(req.body.company_pwd)

		await companyModel.findOne({ company_email: companyEmail })
			.then((company) => {
				if (company.company_pwd !== companyPwd) {
					res.status(403).send({ message: "비밀번호가 다릅니다." })
				} else {
					console.log(secretObj)
					jwt.sign(
						{ company_email: company.company_email },
						secretObj.secret,
						{ expiresIn: '1d' },

						function (err, token) {
							if (err) {
								res.send(err)
							} else {
								res.json({
									message: "로그인 성공, 토큰을 발급합니다.",
									token: token,
									status: "login",
									company_email: company.company_email,
								})
							}
						}
					)
				}
			})
			.catch((err) => {
				res.status(403).send({
					message: "존재하지 않는 아이디입니다."
				})
			})
	}
})

companyRoutes.delete("/", verificationMiddleware)
module.exports = companyRoutes;