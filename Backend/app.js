const express = require('express')
const cors = require('cors')

const companyRoutes = require("./routes/companyRoutes")

const app = express()
app.use(cors())
app.use(express.json())

// routes
app.use("/api/company", companyRoutes)
// app.use("/api/video", companyRoutes)

// model
require("./models/companyModel")
require("./models/videoModel")
require("./models/scrapVideoModel")

module.exports = app;