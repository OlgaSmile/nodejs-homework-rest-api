const Contact = require('../models/contact')
const {HttpError, ctrlWrapper} = require('../helpers');

  const getAll = async (req, res, next) => {
      const {_id: owner} = req.user;
      const {page = 1, limit = 5, ...query} = req.query;
      const skip = (page-1)*limit;
      const result = await Contact.find({owner, ...query}, "", {skip, limit}).populate("owner", "email");
      res.json(result);
  }

  const getById = async (req, res, next) => {
      const id = req.params.contactId
      const result = await Contact.findById(id);
      if(!result){
        throw HttpError(404, `Contact with id "${id}" is not found`)
      }
      res.json(result)
  }

  const deleteById = async (req, res, next) => {
      const id = req.params.contactId;
      const result = await Contact.findByIdAndDelete(id);
  
      if(!result){
        throw HttpError(404, `Contact with id "${id}" is not found`)
      }
      res.json({message: "Delete success"})
  }

  const add = async (req, res, next) => {
    const {_id: owner} = req.user;
      const result = await Contact.create({...req.body, owner});
      res.status(201).json(result)
  }

  const updateById = async (req, res, next) => {
      const id = req.params.contactId;
      const result = await Contact.findByIdAndUpdate(id, req.body, {new:true});
  
      if(!result){
        throw HttpError(404, `Contact with id "${id}" is not found`)
      }
      res.json(result);
  }

  const updateFavorite = async(req, res, next) =>{
    const id = req.params.contactId;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new:true});

    if(!result){
      throw HttpError(404, `Contact with id "${id}" is not found`)
    }
    res.json(result);
  }

  module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    deleteById: ctrlWrapper(deleteById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    updateFavorite: ctrlWrapper(updateFavorite)
  }