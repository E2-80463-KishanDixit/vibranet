const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../controllers/posts_controller');

router.post('/create',passport.checkAuthentication,postController.create);   // passport.checkauthentication will check user who submitted form is authenticated or not 

module.exports = router;