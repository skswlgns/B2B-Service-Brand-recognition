// library
const express = require('express')

// Model
const ChannelModel = require('../models/ChannelModel')
const CompanyModel = require('../models/CompanyModel')
const VideoModel = require('../models/VideoModel')

// Routes
const channelRoutes = express.Router()

// 변수
const admin_id = '5fa21b49bf786c138c6062ee'

// API
// 채널 데이터 삽입
channelRoutes.post('/', async (req, res) => {
  if (req.headers.company_id === admin_id) {
    try {
      const channelName = req.body.channel_name
      const channelSubscribe = req.body.channel_subscribe
      const channelEmail = req.body.channel_email
      const channelImg = req.body.channel_img
      const channelVideoCnt = req.body.channel_video_cnt
      const channelYoutubeId = req.body.channel_youtube_id

      const item = new ChannelModel({
        channel_name: channelName,
        channel_subscribe: channelSubscribe,
        channel_email: channelEmail,
        channel_img: channelImg,
        channel_video_cnt: channelVideoCnt,
        channel_youtube_id: channelYoutubeId
      })
      await item.save()
      res.status(200).send({ message: '채널 데이터가 성공적으로 저장되었습니다.' })
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(403).send({ message: '잘못된 접근입니다.' })
  }
})

// 전체 채널 데이터 조회
channelRoutes.get('/', async (req, res) => {
  if (req.headers.token) {
    try {
      const channelAll = await ChannelModel.find()
      res.status(200).send(channelAll)
    } catch (err) {
      res.status(500).send({ message: '채널 데이터가 없습니다.' })
    }
  } else {
    res.status(403).send({ message: '로그인이 필요한 서비스입니다.' })
  }
})

// 채널 한 개 조회
channelRoutes.get('/:channel_id', async (req, res) => {
  if (req.headers.token) {
    const channelId = req.params.channel_id
    try {
      const channelOne = await ChannelModel.find({ _id: channelId })
      res.status(200).send(channelOne)
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(403).send({ message: '로그인이 필요한 서비스입니다.' })
  }
})

// 채널 삭제
channelRoutes.delete('/:channel_id', async (req, res) => {
  const channelId = req.params.channel_id
  if (req.headers.company_id === admin_id) {
    try {
      const channel = await ChannelModel.findOne({ _id: channelId })
      // console.log(channel)
      if (channel === null) {
        res.status(403).send({ message: '존재하지 않는 채널입니다.' })
      } else {
        await ChannelModel.deleteOne({ _id: channelId })

        // 스크랩 채널 cascade
        const channelScrap = channel.scrap_company_id
        for (let i = 0; i < channelScrap.length; i++) {
          const company = await CompanyModel.findOne({
            _id: channelScrap[i]
          })
          company.company_channel.remove(channelId)
          await CompanyModel.findOneAndUpdate({ _id: channelScrap[i] }, { company_channel: company.company_channel })
        }

        // 컨택 채널 cascade
        const channelContact = channel.contact_company_id
        for (let i = 0; i < channelContact.length; i++) {
          const company = await CompanyModel.findOne({
            _id: channelContact[i]
          })
          company.company_contact.remove(channelId)
          await CompanyModel.findOneAndUpdate({ _id: channelContact[i] }, { company_contact: company.company_contact })
        }

        // 채널에 포함된 영상 삭제
        const video = await VideoModel.find({ channel_id: channelId })
          .populate('scrap_company_id')
          .populate('exception_company_id')

        // console.log(video)

        for (let j = 0; j < video.length; j++) {
          // companyModel의 company_video삭제
          for (let i = 0; i < video[j].scrap_company_id.length; i++) {
            video[j].scrap_company_id[i].company_video.remove(video[j]._id)
            await CompanyModel.findOneAndUpdate(
              { _id: video[j].scrap_company_id[i]._id },
              { company_video: video[j].scrap_company_id[i].company_video }
            )
          }

          // companyModel의 company_exception 삭제
          for (let i = 0; i < video[j].exception_company_id.length; i++) {
            video[j].exception_company_id[i].company_exception.remove(video[j]._id)
            await CompanyModel.findOneAndUpdate(
              { _id: video[j].exception_company_id[i]._id },
              { company_exception: video[j].exception_company_id[i].company_exception }
            )
          }
        }

        await VideoModel.deleteMany({ channel_id: channelId })

        res.status(200).send({ message: '채널이 삭제되었습니다.' })
      }
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(403).send({ message: '잘못된 접근입니다.' })
  }
})

// 채널 스크랩
channelRoutes.put('/scrap', async (req, res) => {
  if (req.headers.token) {
    try {
      const company = await CompanyModel.findOne({
        _id: req.headers.company_id
      })
      const channelId = req.body.channel_id
      const channel = await ChannelModel.findOne({ _id: channelId })

      if (channel) {
        if (company.company_channel.includes(channelId)) {
          company.company_channel.remove(channelId)
          await CompanyModel.findOneAndUpdate(
            { _id: req.headers.company_id },
            { company_channel: company.company_channel }
          )

          channel.scrap_company_id.remove(req.headers.company_id)
          await ChannelModel.findOneAndUpdate({ _id: channelId }, { scrap_company_id: channel.scrap_company_id })

          res.status(200).send({ message: '채널 스크랩 취소' })
        } else {
          company.company_channel.push(channelId)
          await CompanyModel.findOneAndUpdate(
            { _id: req.headers.company_id },
            { company_channel: company.company_channel }
          )

          channel.scrap_company_id.push(req.headers.company_id)
          await ChannelModel.findOneAndUpdate({ _id: channelId }, { scrap_company_id: channel.scrap_company_id })

          res.status(200).send({ message: '채널 스크랩 완료' })
        }
      } else {
        res.status(403).send({ message: '존재하지 않는 채널입니다.' })
      }
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(403).send({ message: '로그인이 필요한 서비스입니다.' })
  }
})

// 채널 컨택하기
channelRoutes.put('/contact', async (req, res) => {
  if (req.headers.token) {
    try {
      const company = await CompanyModel.findOne({
        _id: req.headers.company_id
      })
      const channelId = req.body.channel_id
      const channel = await ChannelModel.findOne({ _id: channelId })

      if (channel) {
        if (company.company_contact.includes(channelId)) {
          company.company_contact.remove(channelId)
          await CompanyModel.findOneAndUpdate(
            { _id: req.headers.company_id },
            { company_contact: company.company_contact }
          )

          channel.contact_company_id.remove(req.headers.company_id)
          await ChannelModel.findOneAndUpdate({ _id: channelId }, { contact_company_id: channel.contact_company_id })
          res.status(200).send({ message: '채널 컨택 취소' })
        } else {
          company.company_contact.push(channelId)
          await CompanyModel.findOneAndUpdate(
            { _id: req.headers.company_id },
            { company_contact: company.company_contact }
          )

          channel.contact_company_id.push(req.headers.company_id)
          await ChannelModel.findOneAndUpdate({ _id: channelId }, { contact_company_id: channel.contact_company_id })
          res.status(200).send({ message: '채널 컨택 완료' })
        }
      } else {
        res.status(403).send({ message: '존재하지 않는 채널입니다.' })
      }
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(403).send({ message: '로그인이 필요한 서비스입니다.' })
  }
})

// Youtube Id로 채널 한 개 조회
channelRoutes.get('/youtube/:channel_youtube_id', async (req, res) => {
  if (req.headers.company_id === admin_id) {
    const channelYoutubeId = req.params.channel_youtube_id
    try {
      const channelOne = await ChannelModel.find({ channel_youtube_id: channelYoutubeId })
      res.status(200).send(channelOne)
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(403).send({ message: '잘못된 접근입니다.' })
  }
})

module.exports = channelRoutes
