const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentsController = require('../controllers/comments_controller');

router.post('/create',passport.checkAuthentication,commentsController.create);   // passport.checkauthentication will check user who submitted form is authenticated or not 

module.exports = router;