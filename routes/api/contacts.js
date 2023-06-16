const express = require('express');
const { getAll, getById, deleteById, add, updateById } = require('../../controllers/contacts');
const {validateBody} = require('../../middlewares');
const schemas = require('../../schemas')

const router = express.Router();


router.get('/', getAll)

router.get('/:contactId', getById)

router.post('/', validateBody(schemas.contactAddSchema), add)

router.delete('/:contactId', deleteById)

router.put('/:contactId', validateBody(schemas.contactAddSchema), updateById)

module.exports = router
