const {listContacts, getContactById, addContact, updateContact, removeContact} = require('../models/contacts');
const {HttpError, ctrlWrapper} = require('../helpers');

  const getAll = async (req, res, next) => {
      const result = await listContacts();
      res.json(result);
  }

  const getById = async (req, res, next) => {
      const id = req.params.contactId
      const result = await getContactById(id);
      if(!result){
        throw HttpError(404, `Contact with id "${id}" is not found`)
      }
      res.json(result)
  }

  const deleteById = async (req, res, next) => {
      const id = req.params.contactId;
      const result = await removeContact(id);
  
      if(!result){
        throw HttpError(404, `Contact with id "${id}" is not found`)
      }
      res.json({message: "Delete success"})
  }

  const add = async (req, res, next) => {
      const result = await addContact(req.body);
      res.status(201).json(result)
  }

  const updateById = async (req, res, next) => {
      const id = req.params.contactId;
      const result = await updateContact(id, req.body);
  
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
    updateById: ctrlWrapper(updateById)
  }