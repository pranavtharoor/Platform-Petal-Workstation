const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
	name: {type: String},
	email: {type: String},
	username: {type: String},
	password: {type: String},
	lastlogin: {type: String},

	facebook: {
		id: {type: String},
		token: {type: String},
 		email: {type: String},
		name: {type: String}
	},

	google: {
		id: {type: String},
		token: {type: String},
		email: {type: String},
		name: {type: String}
	},
	connections: {
		pending: {
			sent: {type: Array},
			received: {type: Array}
		},
		connected: {type: Array},
	}
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
	User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback) {
	const query = {username: username};
	User.findOne(query, callback);
};

module.exports.addUser = function(newUser, callback) {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if(err) throw err;
			newUser.password = hash;
			newUser.save(callback);
		});
	});
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
		if(err) throw err;
		callback(null, isMatch);
	});
};

module.exports.updateUser = function(username, update, callback) {
	User.findOneAndUpdate({username: username}, update, callback);
};

//Connection

module.exports.requestConnection = function(sender, receiver, callback) {

	if(sender == receiver) return {success: false};
	else {
		User.updateUser(sender, {$addToSet: {'connections.pending.sent': {username: receiver}}}, (err, user) => {
			if (err) throw err;
			if(user) {
				User.updateUser(receiver, {$addToSet: {'connections.pending.received': {username: sender}}}, (err, user) => {
					if (err) throw err;
					if(user) {

						User.getUserByUsername(sender, callback);

					} else return {success: false};
				});
			} else return {success: false};
		});
	}

}

module.exports.acceptRequest = function(sender, user, callback) {

	User.getUserByUsername(user, (err, user) => {

		if(err) throw err;
		if(user) {
			var received = user.connections.pending.received;
			var flag = false;
			console.log(received[0].username);
			for(var i = 0; i < received.length; i++) {
				if(received[i].username == sender)
					flag = true;
			}
			if(flag) {

				User.updateUser(user, {$pull: {'connections.pending.received': {username: sender}}}, (err, user) => {
					if (err) throw err;
					if(user) {

						User.updateUser(sender, {$pull: {'connections.pending.sent': {username: user}}}, (err, user) => {
							if (err) throw err;
							if(user) {

								User.updateUser(user, {$addToSet: {'connections.connected': {username: sender}}}, (err, user) => {
									if (err) throw err;
									if(user) {

										User.updateUser(sender, {$addToSet: {'connections.connected': {username: user}}}, (err, user) => {
											if (err) throw err;
											if(user) {

												User.getUserByUsername(user, callback);

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

}

module.exports.removeConnection = function(callback) {

}

module.exports.declineRequest = function(callback) {

}
