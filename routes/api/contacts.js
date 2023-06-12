const express = require('express')
const {listContacts, getContactById} = require('../../models/contacts');
const {HttpError} = require('../../helpers')

const router = express.Router()

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
    const result = await getContactById(req.params.contactId);
    if(!result){
      throw HttpError(404, "Not Found")
    }
    res.json(result)
  } catch (error) {
    next(error)
  }

})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
