const HttpError = require('./HttpError');
const ctrlWrapper = require('./ctrlWrapper');
const handleMongooseError = require('./mongooseError');
const changeImg = require('./jimp')

module.exports ={
    HttpError,
    ctrlWrapper,
    handleMongooseError,
    changeImg
}