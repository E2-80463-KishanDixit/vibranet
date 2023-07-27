// root index for all the versions ==> v1,v2,v3.........

const express = require('express');
const router = express.Router();
const usersApi = require('../../../controllers/api/v1/users_api');


router.post('/create-session',usersApi.createSession);

module.exports = router;