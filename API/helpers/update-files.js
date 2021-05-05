const fs = require('fs');

const Movie = require('../models/movie.model');

const deleteFile = (path) => {


    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }

}

const updateFile = async (field, id, fileName) => {
    let oldPath = '';

    const movie = await Movie.findById(id);

    oldPath = `./uploads/${movie.title}/${movie.backdrop}`;
    deleteFile(oldPath);

    switch (field) {

        case 'backdrop':
            movie.backdrop = fileName;
            break;

        case 'poster':
            movie.poster = fileName;
            break;
        case 'trailer':
            movie.trailer = fileName;
            break;
        case 'movie':
            movie.movie = fileName;
            break;
    }

    await movie.save();
}

module.exports = { updateFile };