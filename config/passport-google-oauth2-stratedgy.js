const passport = require('passport');
const googleStratedgy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require(
    'crypto');
const User = require('../models/user');


passport.use(new googleStratedgy({
        clientID: '1081442797325-p2n0j8d6fmg26140cbgsc4g6sefcrtl9.apps.googleusercontent.com',
        cliendSecret: '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',
        callbackURL: 'http://localhost:8000/users/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        User.findone({ email: profile.emails[0].value }).exec(function(err, user) {
            if (err) {
                console.log('error in google stratedgy ', err);
                return;
            }
            console.log(profile);
            if (user) {
                return done(null, user);
            } else {
                user.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes[20].toString('hex')
                    },
                    function(err, user) {
                        if (err) {
                            console.log('error in creating user in googlestratedy', err);
                            return;
                        }
                        return done(null, user);
                    })
            }
        });

    }


));