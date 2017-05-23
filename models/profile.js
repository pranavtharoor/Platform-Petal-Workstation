const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


//profile schema
/*

-->certificates
-->trainings
-->skillset
-->eductaion
-->experience
-->responsibility
-->name
-->address
-->gender
-->dob

 */


const profileSchema = mongoose.Schema({
	name: {type:String},
	dob : {type:Date},
	gender : {type: String},
	address: {
		street: {type:String},
		city: {type: String},
		state: {type:String},
		country:{type: String},
		pinCode : {type: String}
	}
})