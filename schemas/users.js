const Joi = require('joi');

const {userSubscr} = require('../constants/users');

const userRegisterSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string().valid(...userSubscr).default('starter')
});

const userLogInSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
});

const userSubsciptSchema = Joi.object({
    subscription: Joi.string().valid(...userSubscr).required()
})


module.exports= {userRegisterSchema, userLogInSchema, userSubsciptSchema};