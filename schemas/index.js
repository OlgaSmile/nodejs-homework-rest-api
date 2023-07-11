const {contactAddSchema, contactUpdateFavoriteSchema} = require('./contacts');
const {userRegisterSchema, userLogInSchema, userSubsciptSchema, userEmailSchema} = require('./users')

module.exports = {
    contactAddSchema,
    contactUpdateFavoriteSchema,
    userRegisterSchema,
    userLogInSchema,
    userSubsciptSchema,
    userEmailSchema
}