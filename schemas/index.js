const {contactAddSchema, contactUpdateFavoriteSchema} = require('./contacts');
const {userRegisterSchema, userLogInSchema, userSubsciptSchema} = require('./users')

module.exports = {
    contactAddSchema,
    contactUpdateFavoriteSchema,
    userRegisterSchema,
    userLogInSchema,
    userSubsciptSchema
}