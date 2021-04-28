const Role = require('../models/role.model');
const User = require('../models/user.model');
const Category = require('../models/category.model');
const Movie = require('../models/movie.model');

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

const categoryID = async (id) => {

    const categoryExist = await Category.findById(id);
    if (!categoryExist) {
        throw new Error(`El ID no existe`);
    }
}

const movieID = async (id) => {

    const movieExist = await Movie.findById(id);
    if (!movieExist) {
        throw new Error(`El ID no existe`);
    }
}

module.exports = { validRole, emailExist, userID, categoryID, movieID };