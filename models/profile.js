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
	username: {type: String},
	name: {type:String},
	dob : {type:String},
	gender : {type: String},
	address: {
		street: {type:String},
		city: {type: String},
		state: {type:String},
		country:{type: String},
		pinCode : {type: String}
	}
});

const Profile = module.exports = mongoose.model('Profile', profileSchema);

module.exports.getProfileByUsername = function(username, callback) {
	const query = {username: username};
	Profile.findOne(query, callback);
};

module.exports.addProfile = function(newProfile, callback) {
	newProfile.save(callback);
}

module.exports.updateProfile = function(username, update, callback) {
	Profile.findOneAndUpdate({username: username}, update, callback);
}