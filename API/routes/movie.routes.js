const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidator, jwtValidator, adminRole, } = require('../middlewares');

const { movieID } = require('../helpers/db-validators');

const { getMovie, getAdminMovies, getOneMovie, postMovie, putMovie, blockMovie, unblockMovie } = require('../controllers/movie.controller')

const router = Router();

router.get('/', getMovie);

router.get('/private', [
    jwtValidator,
    adminRole
], getAdminMovies)

router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(movieID),
    fieldsValidator
], getOneMovie)

router.post('/', [
    jwtValidator,
    adminRole,
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('year', 'El año es obligatorio').not().isEmpty(),
    check('category', 'La categoria es obligatorio').not().isEmpty(),
    check('overview', 'La sinopsis es obligatoria').not().isEmpty(),
    check('vote_average', 'La puntuacion es obligatoria').not().isEmpty(),
    fieldsValidator
], postMovie);

router.put('/:id', [
    jwtValidator,
    adminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(movieID),
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('year', 'El año es obligatorio').not().isEmpty(),
    check('category', 'La categoria es obligatorio').not().isEmpty(),
    check('overview', 'La sinopsis es obligatoria').not().isEmpty(),
    check('vote_average', 'La puntuacion es obligatoria').not().isEmpty(),
    fieldsValidator
], putMovie);

router.delete('/block/:id', [
    jwtValidator,
    adminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(movieID)
], blockMovie);

router.delete('/unblock/:id', [
    jwtValidator,
    adminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(movieID)
], unblockMovie);


module.exports = router;