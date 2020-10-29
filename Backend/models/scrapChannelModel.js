const mongoose = require("mongoose")
const Schema = mongoose.Schema

const scrapChannelSchema = new mongoose.Schema({
  channel_id: {
    type: Schema.Types.ObjectId,
    ref: "channel",
    required: true
  },
  company_id: {
    type: Schema.Types.ObjectId,
    ref: "company",
    required: true
  },
})

const scrapChannelModel = mongoose.model("scrapChannel", scrapChannelSchema)

module.exports = scrapChannelModel;