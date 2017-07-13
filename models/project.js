const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const projectSchema = mongoose.Schema({
	username: {type: String},
	name: {type:String},
	projectName: {type: String},
	description: {type:String},
	private: {type: Boolean},
	languages: {type: Array},
	tags: {type: Array},
	team: {type: Array},
	pending: {type: Array},
	requests: {type: Array}
});

projectSchema.index({name: 'text', projectName: 'text', description: 'text', tags: 'text', languages: 'text'});

const Project = module.exports = mongoose.model('Project', projectSchema);

module.exports.getProjects = function(callback) {
	Project.find({private: false}, callback);
};

module.exports.getProjects = function(username, callback) {
	Project.find({username: username}, callback);
};

module.exports.addProject = function(newProject, callback) {
	newProject.save(callback);
};

module.exports.getProjectsFullTextSearch = function(searchString, callback) {
	Project.find({$and:[{private: false}, {$text: {$search: searchString}}]}, callback);
};

module.exports.updateProject = function(username, projectName, update, callback) {
	Project.findOneAndUpdate({username: username, projectName: projectName}, update, callback);
};

module.exports.getProjectsRegexSearch = function(searchString, callback) {
	const regex = new RegExp(escapeRegex(searchString), 'gi');
	Project.find({$and:[{private: false}, {$or:[{description: regex}, {name: regex}, {projectName: regex}, {tags: regex}, {languages: regex}]}]}, callback);
};

module.exports.getProject = function(username, projectName, callback) {
	Project.findOne({username: username, projectName: projectName}, callback);
};

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
