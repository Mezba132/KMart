const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
	name : {
		type: String,
		trim: true,
		required: "Name is required",
		minLength: [2, "Too short"],
		maxLength: [32, "Too Long"]
	},
	slug : {
		type: String,
		unique: true,
		lowercase: true,
		index: true
	}
},{
	timestamps: true
})

module.exports = mongoose.model('Brand', brandSchema)