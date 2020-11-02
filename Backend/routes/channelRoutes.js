// library
const express = require('express');

// Model 
const channelModel = require('../models/channelModel')
const companyModel = require('../models/companyModel')

// Routes 
const channelRoutes = express.Router();

// 변수
const admin_id = "f9e650f73b55508f0eac0546"
// API

// 채널 데이터 삽입
channelRoutes.post('/', async(req, res) => {
  if(req.headers.company_id == "5f9ea11d39a42e4d1c921461"){
    try {
      const channelName = req.body.channel_name
      const channelSubscribe = req.body.channel_subscribe
      const channelEmail = req.body.channel_email
      const channelImg = req.body.channel_img
      const channelVideoCnt = req.body.channel_video_cnt
      const channelYoutubeId = req.body.channel_youtube_id
  
      const item = new channelModel({
        channel_name: channelName,
        channel_subscribe: channelSubscribe,
        channel_email: channelEmail,
        channel_img: channelImg,
        channel_video_cnt: channelVideoCnt,
        channel_youtube_id: channelYoutubeId,
      })
      await item.save()
      res.status(200).send({ message: "채널 데이터가 성공적으로 저장되었습니다." })
    } catch(err) {
      res.status(500).send(err)
    }
  } else {
    res.status(403).send({ message: "잘못된 접근입니다."})
  }
});

// 전체 채널 데이터 조회
channelRoutes.get('/', async(req, res) => {
  try {
    const channelAll = await channelModel.find()
    res.status(200).send(channelAll)
  } catch(err) {
    res.status(500).send(err)
  }
})

// 채널 한 개 조회
channelRoutes.get("/:channel_id", async(req, res) => {
  const channelId = req.params["channel_id"]
  try {
    const channelOne = await channelModel.find({ _id: channelId })
    res.status(200).send(channelOne)
  } catch(err) {
    res.status(500).send(err)
  }
})

// 채널 삭제
channelRoutes.delete("/:channel_id", async(req, res) => {
  const channelId = req.params["channel_id"]
  if(req.headers.company_id == admin_id){
    try {
      await channelModel.find({ _id: channelId })
      .then(async (channel) => {
        if (channel === null) {
          res.status(403).send({ message: "존재하지 않는 채널입니다."})
        } else {
          await channelModel.deleteOne({ _id: channelId })
          res.status(200).send({ message: "채널이 삭제되었습니다." })
        }
      })
    } catch(err) {
      res.status(500).send(err)
    }
  } else {
    res.status(403).send({ message: "잘못된 접근입니다." })
  }
})

// 채널 스크랩
channelRoutes.put('/scrap', async(req, res) => {
  if(req.headers.token) {
    try {
      const company = await companyModel.findOne({ _id: req.headers.company_id })
      const channelId = req.body.channel_id
      console.log(company)
      if(company.company_channel.includes(channelId)){
        company.company_channel.remove(channelId)
        await companyModel.findOneAndUpdate(
          { _id: req.headers.company_id },
          { company_channel: company.company_channel }
        )
        res.status(200).send({ message: "채널 스크랩 취소"})
      } else {
        company.company_channel.push(channelId)
        await companyModel.findOneAndUpdate(
          { _id: req.headers.company_id },
          { company_channel: company.company_channel }
        )
        res.status(200).send({ message: "채널 스크랩 완료"})
      }
    } catch(err) {
      res.status(500).send(err)
    }
  } else {
    res.status(403).send({ message: "로그인이 필요한 서비스입니다. "})
  }
})


// 채널 컨택하기
channelRoutes.put('/contact', async(req, res) => {
  if(req.headers.token) {
    try {
      const company = await companyModel.findOne({ _id: req.headers.company_id })
      const channelId = req.body.channel_id

      console.log('왓슈')
      company.company_contact.push(channelId)
      await companyModel.findOneAndUpdate(
        { _id: req.headers.company_id },
        { company_contact: company.company_contact }
      )
      res.status(200).send({ message: "채널 컨택 완료"})
    } catch(err) {
      res.status(500).send(err)
    }
  } else {
    res.status(403).send({ message: "로그인이 필요한 서비스입니다. "})
  }
})

module.exports = channelRoutes;