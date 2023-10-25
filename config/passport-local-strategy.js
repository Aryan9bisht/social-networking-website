const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
//authentication using passport
passport.use(new LocalStrategy({

    usernameField: 'email',
    passReqToCallback: true
}, function(req, email, password, done) {
    //find user and establish identity
    User.findOne({
        email: email
    }, function(err, user) {
        if (err) {
            req.flash("No user available recheck");
            return done(err);
        }
        if (!user || user.password != password) {
            req.flash("invalid/username/pass");
            return done(null, false);
        }
        return done(null, user);
    });
}));
//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done) {
    done(null, user.id);
})

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if (err) {
            console.log('error in finding user');
            return done(err);
        }
        return done(null, user);
    })
})

//check authentication
passport.checkAuthentication = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();

    }
    //if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}
module.export = passport;