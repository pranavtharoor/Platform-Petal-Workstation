const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const config = require('./database');
const configAuth = require('./auth');
const jwt = require('jsonwebtoken');

module.exports = function(passport) {

   // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

	let opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
	opts.secretOrKey = config.secret;
	passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
		console.log(jwt_payload);
		User.getUserById(jwt_payload._doc._id, (err, user) => {
			if(err) {
				return done(err, false);
			}
			if(user) {
				return done(null, user)
			} else {
				return done(null, false)
			}
		});
	}));

 passport.use('google', new GoogleStrategy({

            clientID: configAuth.googleAuth.clientID,
            clientSecret: configAuth.googleAuth.clientSecret,
            callbackURL: configAuth.googleAuth.callbackURL

        },
        function(token, refreshToken, profile, done) {

            process.nextTick(function() {
                User.findOne({'google.id': profile.id}, function(err, user){
                    if(err)
                        return done(err);

                    if(user)
                        return done(null, user);

                    else{
                        var newUser = new User();

                        newUser.google.id = profile.id;
                        newUser.google.token = token;
                        newUser.google.name = profile.displayName;
                        newUser.google.email = profile.emails[0].value;

                        console.log(newUser);

                        newUser.save(function(err){
                            if(err)
                                throw err;

                            return done(null, newUser);
                        });
                    }
                });

            });
        }));

    passport.use('facebook', new FacebookStrategy({
            clientID: configAuth.fbAuth.clientID,
            clientSecret: configAuth.fbAuth.clientSecret,
            callbackURL: configAuth.fbAuth.callbackURL,
            profileFields: ['id', 'emails', 'displayName']
        },
        function(token, refreshToken, profile, done) {
            process.nextTick(function() {
                User.findOne({ 'facebook.id': profile.id }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user)
                        return done(null, user);
                    else {
                        var newUser = new User();

                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.email = profile.emails[0].value;
                        newUser.facebook.name = profile.displayName;

                        console.log(newUser);
                        
                        newUser.save(function(err) {
                            if (err)
                                throw err;

                            return done(null, newUser);
                        });
                    }
                });
            });
        }));

}