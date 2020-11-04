const express = require('express')
const cors = require('cors')
const requestLogger = require('./middlewares/requestLogger')

const companyRoutes = require('./routes/companyRoutes')
const videoRoutes = require('./routes/videoRoutes')
const channelRoutes = require('./routes/channelRoutes')
const exposureRoutes = require('./routes/exposureRoutes')

const app = express()
app.use(cors())
app.use(express.json())
app.use(requestLogger)

// routes
app.use('/api/company', companyRoutes)
app.use('/api/video', videoRoutes)
app.use('/api/channel', channelRoutes)
app.use('/api/exposure', exposureRoutes)

// model
require('./models/CompanyModel')
require('./models/VideoModel')
require('./models/ScrapVideoModel')
require('./models/ChannelModel')
require('./models/ExposureModel')

module.exports = app
