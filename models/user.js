const {Schema, model} = require('mongoose');

const {handleMongooseError} = require('../helpers')

const {userSubscr} = require('../constants/users')

const userSchema = new Schema({
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: userSubscr,
      default: "starter",
    },
    avatarURL: String,
    token: String,
    
      verify: {
        type: Boolean,
        default: false,
      },
      verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
      },
    
}, {versionKey: false, timestamps: true})

userSchema.post("save", handleMongooseError);

const User = model('user', userSchema);

module.exports = User;