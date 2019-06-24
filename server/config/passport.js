'use strict';

const models = require('../models/index');
var GoogleTokenStrategy = require('passport-google-token').Strategy;
var config = require('./authKeys');

module.exports = function (app, passport) {


    passport.use('google-token', new GoogleTokenStrategy({
        clientID: config.googleAuth.clientID,
        clientSecret: config.googleAuth.clientSecret,
        // callbackURL: '/auth/google/callback',
        // consumerKey: config.googleAuth.clientID,
        // consumerSecret: config.googleAuth.clientSecret
    },
        function (accessToken, refreshToken, profile, done) {
            models.personsModel.upsertGoogleUser(accessToken, refreshToken, profile, function (err, user) {                
                return done(err, user);
            });
        }));
};