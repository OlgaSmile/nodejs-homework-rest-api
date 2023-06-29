const express = require('express');

const {signup, signin} = require('../../controllers/auth')

const {userRegisterSchema, userLogInSchema} = require('../../schemas');

const {validateBody} = require('../../middlewares')

const router = express.Router();

router.post('/signup', validateBody(userRegisterSchema), signup);

router.post('/signin', validateBody(userLogInSchema), signin)

module.exports = router;
