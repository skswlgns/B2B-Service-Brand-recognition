const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new mongoose.Schema({
  company_email: {
    type: String,
    allowNull: false,
    unique: true
  },
  company_nickname: {
    type: String,
    allowNull: false,
    unique: true
  },
  // company_nickname_ko: {
  //   type: String,
  //   // allowNull: false,
  //   // unique: true,
  //   default: '하이'
  // },
  company_pwd: {
    type: String,
    allowNull: false
  },
  company_industry: {
    type: String,
    allowNull: false
  },
  company_total_time: {
    type: Number,
    allowNull: false,
    default: 0
  },
  company_four_week: {
    type: Array,
    allowNull: false
  },
  company_exception: [
    {
      type: Schema.Types.ObjectId,
      ref: 'video'
    }
  ],
  company_video: [
    {
      type: Schema.Types.ObjectId,
      ref: 'video'
    }
  ],
  company_channel: [
    {
      type: Schema.Types.ObjectId,
      ref: 'channel'
    }
  ],
  company_contact: [
    {
      type: Schema.Types.ObjectId,
      ref: 'channel'
    }
  ]
})

const CompanyModel = mongoose.model('company', companySchema)

module.exports = CompanyModel
