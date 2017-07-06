require('../config/passport');
const config = require('../config/database');

module.exports = function(app, passport) {

    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }));

    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/users/profile',
        failureRedirect: '/users/login'
    }));

    // app.get('/profile', (req, res) => {
    //     res.send('profile');
    // });

    // app.get('/login', (req, res) => {
    //     res.send('login');
    // });

};