const express = require('express');
const router = express.Router();
const postsApi = require('../../../controllers/api/v1/posts_api');
const passport = require('passport');

router.get('/',postsApi.index);

router.delete('/:id',passport.authenticate('jwt', {session: false}),postsApi.delete); 
// {session : false } =====> It means that we do not want to generate session cookie 

module.exports = router;