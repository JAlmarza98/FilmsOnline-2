const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidator, jwtValidator } = require('../middlewares');

const { login, refreshToken } = require('../controllers/auth.controller');

const router = Router();

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    fieldsValidator
], login);

router.get('/', jwtValidator, refreshToken)


module.exports = router;