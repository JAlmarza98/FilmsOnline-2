const { Router } = require('express');
const { check } = require('express-validator');

const { jwtValidator, adminRole, fieldsValidator, fileValidator } = require('../middlewares');

const { showFile, updateFile } = require('../controllers/upload.controller');

const router = Router();

router.get('/:field/:id', showFile);

router.put('/:field/:id', [
    jwtValidator,
    adminRole,
    fileValidator,
    check('id', 'No es un ID valido').isMongoId(),
    fieldsValidator
], updateFile);

module.exports = router;