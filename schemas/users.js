const Joi = require('joi');

const {userSubscr} = require('../constants/users');

const userRegisterSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string().tag(...userSubscr).default('starter')
});

const userLogInSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
});


module.exports= {userRegisterSchema, userLogInSchema};