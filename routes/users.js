const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Profile = require('../models/profile');

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
						name: user.name,
						username: user.username,
						email: user.email,
						lastlogin: user.lastlogin
					}
				});
			} else {
				res.json({success:false, msg: 'Wrong password'});
			}
		});
	});
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
	console.log(req.body);
	console.log(newProfile);
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

router.get('/setlogin', passport.authenticate('jwt', {session: false}), (req, res) => {

	User.updateUser(req.user.username, {lastlogin: Date.now()}, (err, user) => {
		if (err) throw err;
		if(user) res.json({success: true});
		else res.json({success: false});
	});

});

module.exports = router;