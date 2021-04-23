const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');

const userGet = async (req, res) => {

    const resPerPage = 10; // usuarios por pagina
    const { page = 1 } = req.query  // Pagina actual
    let total_pages = 1;


    // validar numero de pagina positivo
    if (parseInt(page) < 1) {
        return res.status(400).json({
            msg: 'El numero de pagina deber ser minimo 1'
        });
    }

    //consulta con paginacion
    const [total_users, users] = await Promise.all([
        User.countDocuments(),
        User.find()
            .skip((resPerPage * page) - resPerPage)
            .limit(resPerPage)
    ]);

    //resto de informacion
    let users_this_page = users.length;

    if (total_users % resPerPage === 0) {
        total_pages = total_users / resPerPage;
    } else {
        total_pages = Math.trunc(total_users / resPerPage) + 1;
    }

    if (parseInt(page) > total_pages) {
        return res.status(400).json({
            msg: `La pagina ${page} no existe, actualmente solo tenemos ${total_pages} paginas de usuarios`
        })
    }

    res.json({
        page,
        total_pages,
        users_this_page,
        total_users,
        users
    });
}

const userPut = async (req, res) => {

    const { id } = req.params;
    const { _id, email, role, ...others } = req.body;


    if (others.password) {
        const salt = bcryptjs.genSaltSync();
        others.password = bcryptjs.hashSync(others.password, salt);
    }

    const user = await User.findByIdAndUpdate(id, others, { new: true });

    res.json(user);

}

const userPost = async (req, res) => {

    const { name, email, password } = req.body;
    const user = new User({ name, email, password });

    // encryptar password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({
        msg: 'Usuario creado con exito'
    });
}

const userDelete = async (req, res) => {

    const { id } = req.params;

    await User.findByIdAndDelete(id)

    res.json({
        msg: 'Usuario eliminado con exito'
    });
}

const userPromote = async (req, res) => {

    const { id } = req.params;

    await User.findByIdAndUpdate(id, { role: 'ADMIN_ROLE' });

    res.json({
        msg: 'Usuario promocionado con exito'
    });
}

const userDegrade = async (req, res) => {

    const { id } = req.params;

    await User.findByIdAndUpdate(id, { role: 'USER_ROLE' });

    res.json({
        msg: 'Usuario degradado con exito'
    });
}


module.exports = { userGet, userPut, userPost, userDelete, userPromote, userDegrade }