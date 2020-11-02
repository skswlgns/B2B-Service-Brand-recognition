const express = require('express')
const cors = require('cors')

const companyRoutes = require('./routes/companyRoutes')
const videoRoutes = require('./routes/videoRoutes')
const channelRoutes = require('./routes/channelRoutes')

const app = express()
app.use(cors())
app.use(express.json())

// routes
app.use('/api/company', companyRoutes)
app.use('/api/video', videoRoutes)
app.use('/api/channel', channelRoutes)

// model
require('./models/CompanyModel')
require('./models/VideoModel')
require('./models/ScrapVideoModel')
require('./models/ChannelModel')

module.exports = app
