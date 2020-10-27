import mongoose from "mongoose"

const mongoose = require('mongoose')

const MONGO_URL = "mongodb://loacalhost:27017/local"

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true, 
  useFindAndModify: false 
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))