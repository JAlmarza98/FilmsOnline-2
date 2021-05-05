const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const Movie = require('../models/movie.model');

const { updateFile } = require('../helpers/update-files')

const showFile = async (req, res) => {

    const { field, id } = req.params;

    //Validar tipo de archivo
    const validFields = ['backdrop', 'poster', 'trailer', 'movie'];
    if (!validFields.includes(field)) {
        res.status(400).json({
            msg: 'El campo seleccionada no es correcta'
        });
    }

    const movie = await Movie.findById(id);
    const noImg = path.join(__dirname, '../assets/no-image.jpg');

    switch (field) {
        case 'backdrop':
            const backdropPath = path.join(__dirname, `../uploads/${movie.title}/${movie.backdrop}`);
            if (fs.existsSync(backdropPath)) {
                res.json(backdropPath);
            } else {
                res.sendFile(noImg);
            }
            break;
        case 'poster':
            const posterPath = path.join(__dirname, `../uploads/${movie.title}/${movie.poster}`);
            if (fs.existsSync(posterPath)) {
                res.json(posterPath);
            } else {
                res.sendFile(noImg);
            }
            break;
        case 'trailer':
            const trailerPath = path.join(__dirname, `../uploads/${movie.title}/${movie.trailer}`);
            if (fs.existsSync(trailerPath)) {
                res.json(trailerPath);
            } else {
                res.sendFile(noImg);
            }
            break;
        case 'movie':
            const moviePath = path.join(__dirname, `../uploads/${movie.title}/${movie.movie}`);
            if (fs.existsSync(moviePath)) {
                res.json(moviePath);
            } else {
                res.sendFile(noImg);
            }
            break;
    }

}

const saveFile = async (req, res) => {

    const { field, id } = req.params;

    //Validar tipo de archivo
    const validFields = ['backdrop', 'poster', 'trailer', 'movie'];
    if (!validFields.includes(field)) {
        res.status(400).json({
            msg: 'El campo seleccionada no es correcta'
        });
    }

    //Validar la extension
    const file = req.files.data;
    const cutName = file.name.split('.');
    const extension = cutName[cutName.length - 1];
    const validExtensionsVideo = ['mp4', 'avi', 'mkv'];
    const validExtensionsFoto = ['jpg', 'png', 'jpeg', 'gif'];

    switch (field) {
        case 'backdrop':
            if (!validExtensionsFoto.includes(extension)) {
                return res.status(400).json({
                    msg: `La extension ${extension} no es valida, unicamente archivos ${validExtensionsFoto}`
                });
            }
            break;
        case 'poster':
            if (!validExtensionsFoto.includes(extension)) {
                return res.status(400).json({
                    msg: `La extension ${extension} no es valida, unicamente archivos ${validExtensionsFoto}`
                });
            }
            break;
        case 'trailer':
            if (!validExtensionsVideo.includes(extension)) {
                return res.status(400).json({
                    msg: `La extension ${extension} no es valida, unicamente archivos ${validExtensionsVideo}`
                });
            }
            break;
        case 'movie':
            if (!validExtensionsVideo.includes(extension)) {
                return res.status(400).json({
                    msg: `La extension ${extension} no es valida, unicamente archivos ${validExtensionsVideo}`
                });
            }
            break;
    }

    //Generar nombre del archivo
    const fileName = `${uuidv4()}_${field}.${extension}`;

    //Path para guardar la imagen
    const movie = await Movie.findById(id);
    const path = `./uploads/${movie.title}/${fileName}`;

    console.log(path);

    // Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                msg: 'Error al mover la imagen'
            });
        }

        //Actualizar base de datos
        updateFile(field, id, fileName);

        res.json({
            msg: 'Archivo subido con existo',
            fileName
        })
    });
}

module.exports = { showFile, saveFile }
