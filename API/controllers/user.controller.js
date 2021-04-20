const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');

const userGet = async (req, res) => {
    res.json({
        ok: true,
        msg: 'Obtener usuarios'
    });
}

const userPut = async (req, res) => {
    res.json({
        ok: true,
        msg: 'Actualizar usuario'
    });
}

const userPost = async (req, res) => {

    const { name, email, password } = req.body;
    const user = new User({ name, email, password });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({
        msg: 'Usuario creado con exito'
    });
}

const userDelete = async (req, res) => {
    res.json({
        ok: true,
        msg: 'Eliminar Usuario'
    });
}

module.exports = { userGet, userPut, userPost, userDelete }