const {contactAddSchema, contactUpdateFavoriteSchema} = require('./contacts');
const {userRegisterSchema, userLogInSchema} = require('./users')

module.exports = {
    contactAddSchema,
    contactUpdateFavoriteSchema,
    userRegisterSchema,
    userLogInSchema
}