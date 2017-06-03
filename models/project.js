const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const projectSchema = mongoose.Schema({
	username: {type: String},
	name: {type:String},
	projectName: {type: String},
	description: {type:String},
	languages: {type: Array},
	tags: {type: Array}
})

const Project = module.exports = mongoose.model('Project', projectSchema);

module.exports.getProjects = function(callback) {
	Project.find(callback);
};

module.exports.addProject = function(newProject, callback) {
	newProject.save(callback);
}