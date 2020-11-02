const express = require('express')
const cors = require('cors')

const companyRoutes = require('./routes/companyRoutes')
const videoRoutes = require('./routes/videoRoutes')
const channelRoutes = require('./routes/channelRoutes')
const exposureRoutes = require('./routes/exposureRoutes')

const app = express()
app.use(cors())
app.use(express.json())

// routes
app.use('/api/company', companyRoutes)
app.use('/api/video', videoRoutes)
app.use('/api/channel', channelRoutes)
app.use('/api/exposure', exposureRoutes)

// model
require('./models/companyModel')
require('./models/videoModel')
require('./models/scrapVideoModel')
require('./models/channelModel')

module.exports = app
