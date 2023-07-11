const express = require('express');

const {signup, signin, getCurrent, logout, updateSubscription, updateAvatar, verify} = require('../../controllers/auth')

const {userRegisterSchema, userLogInSchema, userSubsciptSchema} = require('../../schemas');

const {validateBody, upload, authenticate} = require('../../middlewares')

const router = express.Router();

router.post('/signup', upload.single("avatar"), validateBody(userRegisterSchema), signup);

router.get('/verify/:verificationToken', verify);

router.post('/signin', validateBody(userLogInSchema), signin);

router. get('/current', authenticate, getCurrent);

router.post('/logout', authenticate, logout);

router.patch('/subscription', authenticate, validateBody(userSubsciptSchema), updateSubscription);

router.patch('/avatars', authenticate, upload.single("avatars"), updateAvatar)

module.exports = router;
