const express = require('express')
const cors = require('cors')

const companyRoutes = require("./routes/companyRoutes")

const app = express()
app.use(cors())
app.use(express.json())

// routes
app.use("/api/company", companyRoutes)

// model
require("./models/companyModel")

module.exports = app;