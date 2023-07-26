// root index for all the versions ==> v1,v2,v3.........

const express = require('express');
const router = express.Router();

router.use('/posts',require('./posts'));

module.exports = router;