const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new mongoose.Schema({
	company_id : {
		type: Number,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	company_email : {
		type: String,
		allowNull: false,
		unique: true,
	},
	company_nickname: {
		type: String,
		allowNull: false,
		unique: true,
	},
	company_pwd: {
		type: String,
		allowNull: false,
	},
})

const companyModel = mongoose.model("company", companySchema)

module.exports = companyModel;