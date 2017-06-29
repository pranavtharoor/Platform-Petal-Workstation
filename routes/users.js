const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Profile = require('../models/profile');
const Project = require('../models/project');

module.exports = (io) => {
	var io = io;

	router.post('/register', (req, res) => {
		let newUser = new User({
			name: req.body.name,
			email: req.body.email,
			username: req.body.username,
			password: req.body.password,
			lastlogin: 'never'
		});
		User.getUserByUsername(newUser.username, (err, user) => {
			if(err) throw err;
			if(user) {
				return res.json({success: false, msg: 'User already exists'})
			} else {
				User.addUser(newUser, (err, user) => {
					if(err) {
						res.json({success: false, msg: 'Failed to register user'});
					} else {
						res.json({success: true, msg: 'User registered'});
					}
				});
			}
		});
	});

	router.post('/authenticate', (req, res) => {
		const username = req.body.username;
		const password = req.body.password;
		if(username && password) {
			User.getUserByUsername(username, (err, user) => {
				if(err) throw err;
				if(!user) {
					return res.json({success: false, msg: 'User not found'})
				}
				User.comparePassword(password, user.password, (err, isMatch) => {
					if(err) throw err;
					if(isMatch) {
						const token = jwt.sign(user, config.secret, {
							expiresIn: 604800 
						});
						res.json({
							success: true,
							token: 'JWT ' + token,
							user: {
								id: user._id,
								username: user.username,
								lastlogin: user.lastlogin
							}
						});
					} else {
						res.json({success:false, msg: 'Wrong password'});
					}
				});
			});
		} else res.json({success:false, msg: 'Fill all feilds'});
	});

	router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {

		Profile.getProfileByUsername(req.user.username, (err, profile) => {
			if(err) throw err;
			if(profile) {
				return res.json(profile);
			} else {
				res.json({success: false});
			}
		});
	});

	router.post('/updateprofile', passport.authenticate('jwt', {session: false}), (req, res) => {
		let newProfile = new Profile({
			username: req.user.username,
			name: req.body.name,
			dob: req.body.dob,
			gender: req.body.gender,
			address: {
				street: req.body.street,
				city: req.body.city,
				state: req.body.state,
				country: req.body.country,
				pinCode: req.body.pinCode
			}
		});
		var updateProfile = {
			name: req.body.name,
			dob: req.body.dob,
			gender: req.body.gender,
			address: {
				street: req.body.street,
				city: req.body.city,
				state: req.body.state,
				country: req.body.country,
				pinCode: req.body.pinCode
			}
		}
		Profile.getProfileByUsername(req.user.username, (err, profile) => {
			if(err) throw err;
			if(profile) {
				Profile.updateProfile(req.user.username, updateProfile, (err, profile) => {
					if(err) {
						res.json({success: false, msg: 'Failed to update profile'});
					} else {
						res.json({success: true, msg: 'Profile updated'});
					}
				});
			} else {
				Profile.addProfile(newProfile, (err, profile) => {
					if(err) {
						res.json({success: false, msg: 'Failed to update profile'});
					} else {
						res.json({success: true, msg: 'Profile updated'});
					}
				});
			}
		});
	});

	router.post('/addproject', passport.authenticate('jwt', {session: false}), (req, res) => {
		Profile.getProfileByUsername(req.user.username, (err, profile) => {
			if(err) throw err;
			var tags = [];
			var languages = [];
			if(profile) {
				for(var i = 0; i < req.body.tags.length; i++) {
					tags.push(req.body.tags[i].tag);
				}
				for(var i = 0; i < req.body.languages.length; i++) {
					languages.push(req.body.languages[i].language);
				}
				let newProject = new Project({
					username: req.user.username,
					name: profile.name,
					description: req.body.description,
					projectName: req.body.projectName,
					languages: languages,
					tags: tags
				});
				Project.addProject(newProject, (err, project) => {
					if(err) {
						res.json({success: false, msg: 'Failed to add project'});
					} else {
						res.json({success: true, msg: 'Project added'});
					}
				});
			} else {
				res.json({success: false ,msg: 'Add profile details before making projects'})
			}
		});
	});

	router.get('/projects', passport.authenticate('jwt', {session: false}), (req, res) => {
		Project.getProjects((err, projects) => {
			if(err) throw err;
			res.json(projects);
		});
	});

	router.post('/search', passport.authenticate('jwt', {session: false}), (req, res) => {
		var searchString = req.body.searchString;
		
		Project.getProjectsRegexSearch(searchString, function(err, projects) {
	        if(err) throw err;
	        else res.json(projects);
	    });

		// Project.getProjectsFullTextSearch(searchString, (err, projects) => {
		// 	if(err) throw err;
		// 	res.json(projects);
		// });
	});

	router.get('/setlogin', passport.authenticate('jwt', {session: false}), (req, res) => {

		User.updateUser(req.user.username, {lastlogin: Date.now()}, (err, user) => {
			if (err) throw err;
			if(user) res.json({success: true});
			else res.json({success: false});
		});

	});

	router.post('/requestconnection', passport.authenticate('jwt', {session: false}), (req, res) => {

		if(req.user.username == req.body.receiver) res.json({success: false});
		else {
			User.getUserByUsername(req.user.username, (err, user) => {

				if(err) throw err;
				if(user) {
					var sent = user.connections.pending.sent;
					var flag = false;
					for(var i = 0; i < sent.length; i++) {
						if(sent[i].username == req.body.receiver)
							flag = true;
					}
					if(!flag) {
						User.updateUser(req.user.username, {$addToSet: {'connections.pending.sent': {username: req.body.receiver}}}, (err, user) => {
							if (err) throw err;
							if(user) {
								User.updateUser(req.body.receiver, {$addToSet: {'connections.pending.received': {username: req.user.username}}}, (err, user) => {
									if (err) throw err;
									if(user) {

										User.getUserByUsername(req.user.username, (err, user) => {
											if(err) throw err;
											if(user) {
												return res.json(user.connections);
											} else {
												res.json({success: false});
											}
										});

									} else res.json({success: false});
								});
							} else res.json({success: false});
						});
					}
				}
			});
		}

	});

	router.post('/acceptrequest', passport.authenticate('jwt', {session: false}), (req, res) => {

		User.getUserByUsername(req.user.username, (err, user) => {

			if(err) throw err;
			if(user) {
				var received = user.connections.pending.received;
				var flag = false;
				for(var i = 0; i < received.length; i++) {
					if(received[i].username == req.body.sender)
						flag = true;
				}
				if(flag) {

					User.updateUser(req.user.username, {$pull: {'connections.pending.received': {username: req.body.sender}}}, (err, user) => {
						if (err) throw err;
						if(user) {

							User.updateUser(req.body.sender, {$pull: {'connections.pending.sent': {username: req.user.username}}}, (err, user) => {
								if (err) throw err;
								if(user) {

									User.updateUser(req.user.username, {$addToSet: {'connections.connected': {username: req.body.sender}}}, (err, user) => {
										if (err) throw err;
										if(user) {

											User.updateUser(req.body.sender, {$addToSet: {'connections.connected': {username: req.user.username}}}, (err, user) => {
												if (err) throw err;
												if(user) {

													User.getUserByUsername(req.user.username, (err, user) => {
														if(err) throw err;
														if(user) {
															return res.json(user.connections);
														} else {
															res.json({success: false});
														}
													});

												} else res.json({success: false});							
											});		

										} else res.json({success: false});
									});

								} else res.json({success: false});
							});

						} else res.json({success: false});
					});
				}

			} else res.json({success: false});

		});


	});

	router.post('/declinerequest', passport.authenticate('jwt', {session: false}), (req, res) => {

		User.updateUser(req.user.username, {$pull: {'connections.pending.received': {username: req.body.sender}}}, (err, user) => {
			if (err) throw err;
			if(user) {

				User.updateUser(req.body.sender, {$pull: {'connections.pending.sent': {username: req.user.username}}}, (err, user) => {
					if (err) throw err;
					if(user) {

						User.getUserByUsername(req.user.username, (err, user) => {
							if(err) throw err;
							if(user) {
								return res.json(user.connections);
							} else {
								res.json({success: false});
							}
						});

					} else res.json({success: false});
				});

			} else res.json({success: false});
		});
	});

	router.post('/removeconnection', passport.authenticate('jwt', {session: false}), (req, res) => {

		User.updateUser(req.user.username, {$pull: {'connections.connected': {username: req.body.user}}}, (err, user) => {
			if (err) throw err;
			if(user) {

				User.updateUser(req.body.user, {$pull: {'connections.connected': {username: req.user.username}}}, (err, user) => {
					if (err) throw err;
					if(user) {
						
						User.getUserByUsername(req.user.username, (err, user) => {
							if(err) throw err;
							if(user) {
								return res.json(user.connections);
							} else {
								res.json({success: false});
							}
						});

					} else res.json({success: false});							
				});		

			} else res.json({success: false});
		});

	});

	router.get('/connections', passport.authenticate('jwt', {session: false}), (req, res) => {

		User.getUserByUsername(req.user.username, (err, user) => {
			if(err) throw err;
			if(user) {
				return res.json(user.connections);
			} else {
				res.json({success: false});
			}
		});

	});


	return router
};