const express = require('express');

const {signup, signin, getCurrent, logout, updateSubscription} = require('../../controllers/auth')

const {userRegisterSchema, userLogInSchema, userSubsciptSchema} = require('../../schemas');

const {validateBody} = require('../../middlewares')

const {authenticate} = require("../../middlewares")

const router = express.Router();

router.post('/signup', validateBody(userRegisterSchema), signup);

router.post('/signin', validateBody(userLogInSchema), signin);

router. get('/current', authenticate, getCurrent);

router.post('/logout', authenticate, logout);

router.patch('/subscription', authenticate, validateBody(userSubsciptSchema), updateSubscription)

module.exports = router;
