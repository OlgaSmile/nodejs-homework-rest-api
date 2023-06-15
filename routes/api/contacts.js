const express = require('express')
const Joi = require('joi')

const {listContacts, getContactById, addContact, updateContact, removeContact} = require('../../models/contacts');
const {HttpError} = require('../../helpers');

const router = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
})

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error)
  }

})

router.get('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId
    const result = await getContactById(id);
    if(!result){
      throw HttpError(404, `Contact with id "${id}" is not found`)
    }
    res.json(result)
  } catch (error) {
    next(error)
  }

})

router.post('/', async (req, res, next) => {
  try {
    const {error} = contactAddSchema.validate(req.body);

    if(error){
      const field = (error.details[0].path[0]);
      throw HttpError(400, `missing required "${field}" field`)
    }
    const result = await addContact(req.body);
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await removeContact(id);
    if(!result){
      throw HttpError(404, `Contact with id "${id}" is not found`)
    }
    res.json({message: "Delete success"})

  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = contactAddSchema.validate(req.body);

    if(error){
      const field = (error.details[0].path[0]);
      throw HttpError(400, `missing required "${field}" field`)
    }

    const id = req.params.contactId;
    const result = await updateContact(id, req.body);

    if(!result){
      throw HttpError(404, `Contact with id "${id}" is not found`)
    }

    res.json(result);

  } catch (error) {
    next(error)
  }
})

module.exports = router
