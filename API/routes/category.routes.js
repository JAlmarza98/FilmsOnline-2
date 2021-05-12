const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidator, jwtValidator, adminRole, } = require('../middlewares');

const { categoryID } = require('../helpers/db-validators');

const { getCategory, postCategory, putCategory, deleteCategory, releaseCategory, getMoviesXCategory, getCategoryAdmin } = require('../controllers/category.controller')

const router = Router();

router.get('/', getCategory);

router.get('/private', [
    jwtValidator,
    adminRole
], getCategoryAdmin);

router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(categoryID),
    fieldsValidator
], getMoviesXCategory);

router.post('/', [
    jwtValidator,
    adminRole,
    check('name', 'El nombre es obligarotio').not().isEmpty(),
    fieldsValidator
], postCategory);

router.put('/:id', [
    jwtValidator,
    adminRole,
    check('name', 'El nombre es obligarotio').not().isEmpty(),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(categoryID),
    fieldsValidator
], putCategory);

router.delete('/block/:id', [
    jwtValidator,
    adminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(categoryID),
    fieldsValidator
], deleteCategory);

router.delete('/unblock/:id', [
    jwtValidator,
    adminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(categoryID),
    fieldsValidator
], releaseCategory);


module.exports = router;