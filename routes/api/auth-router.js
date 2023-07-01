const express = require('express');

const {signup, signin, getCurrent, logout} = require('../../controllers/auth')

const {userRegisterSchema, userLogInSchema} = require('../../schemas');

const {validateBody} = require('../../middlewares')

const {authenticate} = require("../../middlewares")

const router = express.Router();

router.post('/signup', validateBody(userRegisterSchema), signup);

router.post('/signin', validateBody(userLogInSchema), signin);

router. get('/current', authenticate, getCurrent);

router.post('/logout', authenticate, logout)

module.exports = router;
