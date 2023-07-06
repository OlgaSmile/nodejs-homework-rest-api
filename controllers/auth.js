const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const fs = require('fs').promises;
const path = require('path');
const gravatar = require('gravatar');

const User = require('../models/user');

const {HttpError, ctrlWrapper, changeImg} = require('../helpers');

const usersDir = path.resolve('public', 'avatars')

const {SECRET_KEY} = process.env;

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

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({...req.body, avatarURL, password: hashPassword});

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    })
}

const signin = async (req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw HttpError(401, "Email or password is wrong");
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
    updateAvatar: ctrlWrapper(updateAvatar)
}