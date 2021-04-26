const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidator, jwtValidator, adminRole } = require('../middlewares')

const { validRole, emailExist, userID } = require('../helpers/db-validators')

const { userGet, userPut, userPost, userDelete, userPromote, userDegrade } = require('../controllers/user.controller');

const router = Router();

router.get('/', [
    jwtValidator,
    adminRole
], userGet);

router.post('/', [
    jwtValidator,
    adminRole,
    check('name', 'El nombre es obligarotio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo ingresado no es valido').isEmail(),
    check('email').custom(emailExist),
    check('role').custom(validRole),
    fieldsValidator
], userPost);

router.put('/:id', [
    jwtValidator,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userID),
    check('name', 'El nombre es obligarotio').not().isEmpty(),
    fieldsValidator
], userPut);

router.delete('/:id', [
    jwtValidator,
    adminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userID),
    fieldsValidator
], userDelete);

router.put('/promote/:id', [
    jwtValidator,
    adminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userID),
    fieldsValidator
], userPromote);

router.put('/degrade/:id', [
    jwtValidator,
    adminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userID),
    fieldsValidator
], userDegrade);


module.exports = router;