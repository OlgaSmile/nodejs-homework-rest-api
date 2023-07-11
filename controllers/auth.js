const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const fs = require('fs').promises;
const path = require('path');
const gravatar = require('gravatar');
const {nanoid} = require('nanoid');

const User = require('../models/user');

const {HttpError, ctrlWrapper, changeImg, emailSend} = require('../helpers');

const usersDir = path.resolve('public', 'avatars')

const {SECRET_KEY, BASE_URL} = process.env;

const signup = async (req, res) =>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
        throw HttpError(409, "Email already in use")
    }
    let avatarURL = gravatar.url(email);
    if(req.file){
        const {_id} = req.user;
        const {path:oldPath, originalname} = req.file;
        await changeImg(oldPath);
    const newName = `${_id}_${originalname}`;
    const newPath = path.join(usersDir, newName);
    fs.rename(oldPath, newPath);

    avatarURL = path.join( "avatars", newName)}

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = nanoid();

    const newUser = await User.create({...req.body, avatarURL, password: hashPassword, verificationToken});

    const verifyEmail ={
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}" >Click to verify email</a>`
    }

    await emailSend(verifyEmail);

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    })
}

const verify = async (req, res) =>{
    const {verificationToken} = req.params;
    const user = await User.findOne({verificationToken})
    if(!user){
        throw HttpError(404, 'User not found')
    }

    await User.findByIdAndUpdate(user._id, {verify: true, verificationToken:''})

    res.json({
        message: "Verification successful"
    })
}

const resendVerify = async (req, res)=>{
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw HttpError(404, 'User not found')
    }
    if(user.verify){
        throw HttpError(400, "Verification has already been passed")
    }
    const verifyEmail ={
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}" >Click to verify email</a>`
    } 
    await emailSend(verifyEmail); 

    res.json({
        message: "Verification email sent"
    })      
}

const signin = async (req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw HttpError(401, "Email or password is wrong");
    }
    if(!user.verify){
    throw HttpError(401, 'Email is not verified')
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
        throw HttpError(401, "Email or password is wrong");
    }
    const {_id: id} = user;
    const payload ={
        id
    }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(id, {token});

    res.json({token})
}

const getCurrent = async (req, res)=>{
    const {email} = req.user;
    res.json({
        email,
    })
}

const logout = async (req, res)=>{
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token:''});

    res.status(204).json({message: "Logout success"})
}

const updateSubscription = async (req, res) =>{
    const {_id} = req.user;
    const newSubscr = req.body.subscription;
    const presentSubscr = req.user.subscription;
    if(newSubscr===presentSubscr){
        throw HttpError(409, `You had already get ${newSubscr} subscription`);
    }

    const result = await User.findByIdAndUpdate(_id, {subscription: newSubscr}, {new:true})

    res.status(201).json(result)
}

const updateAvatar = async (req, res) =>{
    const {_id} = req.user;
    const {path:oldPath, originalname} = req.file;

    await changeImg(oldPath);
    const newName = `${_id}_${originalname}`;
    const newPath = path.join(usersDir, newName);
    fs.rename(oldPath, newPath);

    const newAvatarURL = path.join( "avatars", newName);

    const result = await User.findByIdAndUpdate(_id, {avatarURL: newAvatarURL}, {new:true})

    res.status(201).json(result)
}

module.exports = {
    signup : ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
    verify: ctrlWrapper(verify),
    resendVerify: ctrlWrapper(resendVerify)
}