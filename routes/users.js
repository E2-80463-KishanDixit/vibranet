const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');

router.get('/profile',passport.checkAuthentication,usersController.profile);

router.get('/sign-in',usersController.signIn);

router.get('/sign-up',usersController.signUp);

router.post('/create',usersController.create);

//use passport as middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},   // if authentication is not done then user will redirect to sign in page
),usersController.createSession);

router.get('/sign-out',usersController.destroySession);
module.exports = router;