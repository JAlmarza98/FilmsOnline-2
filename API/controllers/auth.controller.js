const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');

const { generateJWT } = require('../helpers/jwt-generator');

const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        //Verificar si el email existe
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "Email o contraseña incorrectos"
            });
        }

        //Verificar si el usuario esta activo
        if (user.status === false) {
            return res.status(400).json({
                message: "Email o contraseña incorrectos"
            });
        }

        //Verificar el password
        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                message: "Email o contraseña incorrectos"
            });
        }

        //Generar JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message: "Algo salio mal"
        })
    }
}

const refreshToken = async (req, res) => {

    const { user_auth } = req;

    const token = await generateJWT(user_auth.id);

    const user = await User.findById(user_auth.id);

    res.json({ token, user });
}


module.exports = { login, refreshToken }