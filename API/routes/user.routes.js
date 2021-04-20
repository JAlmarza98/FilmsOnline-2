const { Router } = require('express');
const { check } = require('express-validator');

const { validRole, emailExist, userID } = require('../helpers/db-validators')

const { fieldsValidator } = require('../middlewares/fields-validator');

const { userGet, userPut, userPost, userDelete } = require('../controllers/user.controller');

const router = Router();

router.get('/', userGet);

router.post('/', [
    check('name', 'El nombre es obligarotio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo ingresado no es valido').isEmail(),
    check('email').custom(emailExist),
    check('role').custom(validRole),
    fieldsValidator
], userPost);

router.put('/:id', userPut);

router.delete('/:id', userDelete);

module.exports = router;