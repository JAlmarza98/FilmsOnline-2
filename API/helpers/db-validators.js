const Role = require('../models/role.model');
const User = require('../models/user.model');

const validRole = async (role = '') => {

    const roleExist = await Role.findOne({ role });
    if (!roleExist) {
        throw new Error(`El rol ${role} no es valido`);
    }
}

const emailExist = async (email = '') => {

    const exist = await User.findOne({ email });
    if (exist) {
        throw new Error(`El correo ${email} ya esta registrado`);
    }
}

const userID = async (id) => {

    const userExist = await User.findById(id);
    if (!userExist) {
        throw new Error(`El ID no existe`);
    }
}


module.exports = { validRole, emailExist, userID };