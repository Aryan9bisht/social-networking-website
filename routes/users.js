const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');
const homeController = require('../controllers/home_controller');

router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);
router.get('/Home', homeController.home);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.get('/sign-out', usersController.signOut);
router.post('/create', usersController.create);
router.post('/create-session', passport.authenticate(
    'local', { failureRedirect: '/users/sign-in' },
), usersController.createSession);
router.post('/signOut', usersController.signOut);

module.exports = router;