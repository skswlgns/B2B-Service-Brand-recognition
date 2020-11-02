const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new mongoose.Schema({
  company_id: {
    type: Number,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
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
  company_execption: {
    type: Schema.Types.Array,
    ref: 'video'
  },
  company_video: {
    type: Schema.Types.Array,
    ref: 'video'
  },
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
