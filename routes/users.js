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
						delete user.password;
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

	router.post('/getuserprofile', passport.authenticate('jwt', {session: false}), (req, res) => {
	
		Profile.getProfileByUsername(req.body.username, (err, profile) => {
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
		Project.getProject(req.user.username, req.body.projectName, (err, project) => {
			if(project) {
				res.json({success: false, msg: 'You already have a project with this project name. Use a different project name'})
			} else {
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
							private: req.body.private,
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
						res.json({success: false, msg: 'Add profile details before making projects'})
					}
				});
			}
		});
	});

	router.get('/projects', passport.authenticate('jwt', {session: false}), (req, res) => {
		Project.getProjects((err, projects) => {
			if(err) throw err;
			res.json(projects);
		});
	});

	router.post('/searchprojects', passport.authenticate('jwt', {session: false}), (req, res) => {
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

	router.get('/userprojects', passport.authenticate('jwt', {session: false}), (req, res) => {
		Project.getProjects(req.user.username, (err, projects) => {
			if(err) throw err;
			res.json(projects);
		});
	});

	router.post('/project', passport.authenticate('jwt', {session: false}), (req, res) => {
		Project.getProject(req.body.creator, req.body.projectName, (err, project) => {
			if(err) throw err;
			if(project)
			res.json(project);
		});
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

	router.post('/searchprofiles', passport.authenticate('jwt', {session: false}), (req, res) => {
		var searchString = req.body.searchString;

		Profile.getProfilesRegexSearch(searchString, function(err, profiles) {
	        if(err) throw err;
	        else res.json(profiles);
	    });

		// Profile.getProfileFullTextSearch(searchString, (err, profile) => {
		// 	if(err) throw err;
		// 	res.json(profile);
		// });
	});

	router.post('/sendteaminvite', passport.authenticate('jwt', {session: false}), (req, res) => {

		if(req.user.username == req.body.receiver) res.json({success: false});
		else {
			Project.getProject(req.user.username, req.body.projectName, (err, project) => {

				if(err) throw err;
				if(project) {
					var sent = project.pending;
					var flag = false;
					for(var i = 0; i < sent.length; i++) {
						if(sent[i].username == req.body.receiver)
							flag = true;
					}
					if(!flag) {
						Project.updateProject(req.user.username, req.body.projectName, {$addToSet: {'pending': {username: req.body.receiver}}}, (err, project) => {
							if (err) throw err;
							if(project) {
								User.updateUser(req.body.receiver, {$addToSet: {'pendingTeamInvites': {projectName: req.body.projectName, creator: req.user.username}}}, (err, user) => {
									if (err) throw err;
									if(user) {

										Project.getProject(req.user.username, req.body.projectName, (err, project) => {
											if(err) throw err;
											if(user) {
												return res.json(project);
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

	router.get('/getteams', passport.authenticate('jwt', {session: false}), (req, res) => {
		User.getUserByUsername(req.user.username, (err, user) => {
			if(err) throw err;
			if(user) res.json({invites: user.pendingTeamInvites, teams: user.teams, sentTeamRequests: user.sentTeamRequests});
		});
	});

	router.post('/acceptprojectinvite', passport.authenticate('jwt', {session: false}), (req, res) => {
		
		User.getUserByUsername(req.user.username, (err, user) => {

			if(err) throw err;
			if(user) {
				var received = user.pendingTeamInvites;
				var flag = false;
				for(var i = 0; i < received.length; i++) {
					if(received[i].creator == req.body.creator && received[i].projectName == req.body.projectName)
						flag = true;
				}
				if(flag) {

					User.updateUser(req.user.username, {$pull: {'pendingTeamInvites': {creator: req.body.creator, projectName: req.body.projectName}}},(err, user) => {
						if(err) throw err;
						if(user){
							Project.updateProject(req.body.creator, req.body.projectName, {$pull: {'pending': {username: req.user.username}}},(err, project) => {
								if(err) throw err;
								if(project){
									Project.updateProject(req.body.creator, req.body.projectName, {$addToSet: {'team': {username: req.user.username}}},(err, project) => {
										if(err) throw err;
										if(project){
											User.updateUser(req.user.username, {$addToSet: {'teams': {creator: req.body.creator, projectName: req.body.projectName}}},(err, user) => {
												if(err) throw err;
												if(user){
													res.json({invites: user.pendingTeamInvites, teams: user.teams});
												}
											});
										} else res.json({success: false});
									});
								} else res.json({success: false});
							});
						} else res.json({success: false});
					});
				}
			}
		});
	});

	router.post('/declineprojectinvite', passport.authenticate('jwt', {session: false}), (req, res) => {
		User.getUserByUsername(req.user.username, (err, user) => {

			if(err) throw err;
			if(user) {
				var received = user.pendingTeamInvites;
				var flag = false;
				for(var i = 0; i < received.length; i++) {
					if(received[i].creator == req.body.creator && received[i].projectName == req.body.projectName)
						flag = true;
				}
				if(flag) {

					Project.updateProject(req.body.creator, req.body.projectName, {$pull: {'pending': {username: req.user.username}}},(err, project) => {
						if(err) throw err;
						if(project){
							User.updateUser(req.user.username, {$pull: {'pendingTeamInvites': {creator: req.body.creator, projectName: req.body.projectName}}},(err, user) => {
								if(err) throw err;
								if(user){
									User.getUserByUsername(req.user.username, (err, user) => {
										if(err) throw err;
										if(user){
											res.json({invites: user.pendingTeamInvites, teams: user.teams});
										}
									});
								} else res.json({success: false});
							});
						} else res.json({success: false});
					});
				}
			}
		});
	});

	router.post('/removemember', passport.authenticate('jwt', {session: false}), (req, res) => {
		Project.updateProject(req.user.username, req.body.projectName, {$pull: {'team': {username: req.body.member}}},(err, project) => {
			if(err) throw err;
			if(project){
				User.updateUser(req.body.member, {$pull: {'teams': {creator: req.user.username, projectName: req.body.projectName}}},(err, user) => {
					if(err) throw err;
					if(user){
						Project.getProject(req.user.username, req.body.projectName,(err, project) => {
							if(err) throw err;
							if(project){
								res.json(project);
							}
						});
					} else res.json({success: false});
				});
			} else res.json({success: false});
		});
	});

	router.post('/leaveproject', passport.authenticate('jwt', {session: false}), (req, res) => {
		Project.updateProject(req.body.creator, req.body.projectName, {$pull: {'team': {username: req.user.username}}},(err, project) => {
			if(err) throw err;
			if(project){
				User.updateUser(req.user.username, {$pull: {'teams': {creator: req.body.creator, projectName: req.body.projectName}}},(err, user) => {
					if(err) throw err;
					if(user){
						res.json({success: true});
					} else res.json({success: false});
				});
			} else res.json({success: false});
		});
	});

	router.post('/getmemberteams', passport.authenticate('jwt', {session: false}), (req, res) => {
		User.getUserByUsername(req.body.username, (err, user) => {
			if(err) throw err;
			if(user) {
				res.json(user.teams);
			}
		});
	});

	router.post('/requestjoinproject', passport.authenticate('jwt', {session: false}), (req, res) => {
		if(req.user.username == req.body.creator) res.json({success: false});
		else {
			Project.getProject(req.body.creator, req.body.projectName, (err, project) => {

				if(err) throw err;
				if(project) {
					var received = project.requests;
					var flag = false;
					for(var i = 0; i < received.length; i++) {
						if(received[i].username == req.user.username)
							flag = true;
					}
					if(!flag) {
						Project.updateProject(req.body.creator, req.body.projectName, {$addToSet: {'requests': {username: req.user.username}}}, (err, project) => {
							if (err) throw err;
							if(project) {
								User.updateUser(req.user.username, {$addToSet: {'sentTeamRequests': {projectName: req.body.projectName, creator: req.body.creator}}}, (err, user) => {
									if (err) throw err;
									if(user) {
										res.json({success: true});
									} else res.json({success: false});
								});
							} else res.json({success: false});
						});
					}
				}
			});
		}

	});

	router.post('/acceptrequesttojointeam', passport.authenticate('jwt', {session: false}), (req, res) => {
		
		User.getUserByUsername(req.body.sender, (err, user) => {

			if(err) throw err;
			if(user) {
				var sent = user.sentTeamRequests;
				var flag = false;
				for(var i = 0; i < sent.length; i++) {
					if(sent[i].creator == req.user.username && sent[i].projectName == req.body.projectName)
						flag = true;
				}
				if(flag) {

					User.updateUser(req.user.username, {$pull: {'sentTeamRequests': {creator: req.user.username, projectName: req.body.projectName}}},(err, user) => {
						if(err) throw err;
						if(user){
							Project.updateProject(req.user.username, req.body.projectName, {$pull: {'requests': {username: req.body.sender}}},(err, project) => {
								if(err) throw err;
								if(project){
									Project.updateProject(req.user.username, req.body.projectName, {$addToSet: {'team': {username: req.body.sender}}},(err, project) => {
										if(err) throw err;
										if(project){
											User.updateUser(req.body.sender, {$addToSet: {'teams': {creator: req.user.username, projectName: req.body.projectName}}},(err, user) => {
												if(err) throw err;
												if(user){
													Project.getProject(req.user.username, req.body.projectName,(err, project) => {
														if(project) {
															res.json(project);
														} else res.json({success: false});
													});
												}
											});
										} else res.json({success: false});
									});
								} else res.json({success: false});
							});
						} else res.json({success: false});
					});
				}
			}
		});
	});

	router.post('/declinerequesttojointeam', passport.authenticate('jwt', {session: false}), (req, res) => {
		User.getUserByUsername(req.body.sender, (err, user) => {

			if(err) throw err;
			if(user) {
				var sent = user.sentTeamRequests;
				var flag = false;
				for(var i = 0; i < sent.length; i++) {
					if(sent[i].creator == req.user.username && sent[i].projectName == req.body.projectName)
						flag = true;
				}
				if(flag) {

					Project.updateProject(req.user.username, req.body.projectName, {$pull: {'requests': {username: req.body.sender}}},(err, project) => {
						if(err) throw err;
						if(project){
							User.updateUser(req.body.sender, {$pull: {'sentTeamRequests': {creator: req.user.username, projectName: req.body.projectName}}},(err, user) => {
								if(err) throw err;
								if(user){
									Project.getProject(req.user.username, req.body.projectName,(err, project) => {
										if(project) {
											res.json(project);
										} else res.json({success: false});
									});
								} else res.json({success: false});
							});
						} else res.json({success: false});
					});
				}
			}
		});
	});

	return router;
};