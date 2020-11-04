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
  company_pwd: {
    type: String,
    allowNull: false
  },
  company_industry: {
    type: String,
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
