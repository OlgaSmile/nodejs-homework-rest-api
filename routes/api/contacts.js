const express = require('express');
const { getAll, getById, deleteById, add, updateById, updateFavorite } = require('../../controllers/contacts');
const {validateBody, isValidId, authenticate} = require('../../middlewares');
const schemas = require('../../schemas');

const router = express.Router();

router.use(authenticate)

router.get('/', getAll)

router.get('/:contactId', isValidId, getById)

router.post('/', validateBody(schemas.contactAddSchema), add)

router.delete('/:contactId', isValidId, deleteById)

router.put('/:contactId', isValidId, validateBody(schemas.contactAddSchema), updateById)

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.contactUpdateFavoriteSchema), updateFavorite)

module.exports = router
