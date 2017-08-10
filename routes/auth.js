require('../config/passport');
const config = require('../config/database');
const jwt = require('jsonwebtoken');

module.exports = function(app, passport) {

    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/loggingin',
        failureRedirect: '/login'
    }));

    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/loggingin',
        failureRedirect: '/login'
    }));

    app.get('/getjwt', isLoggedIn, (req, res) => {
        const token = jwt.sign(req.user, config.secret, {
                            expiresIn: 604800 
                        });
        res.json({
            success: true,
            token: 'JWT ' + token,
            user: {
                id: req.user._id,
                username: req.user.username,
                lastlogin: req.user.lastlogin
            }
        });
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        else
            res.redirect('/register');
    }

};