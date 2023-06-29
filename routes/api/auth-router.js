const express = require('express');

const {userRegisterSchema} = require('../../schemas');

const {validateBody} = require('../../middlewares')

const router = express.Router();

router.post('/signup', validateBody(userRegisterSchema), )

module.exports = router;
