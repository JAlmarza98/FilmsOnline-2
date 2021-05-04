const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const Movie = require('../models/movie.model');

const showFile = async (req, res) => {

}

const updateFile = async (req, res) => {

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
    console.log(extension);
    if (field === 'backdrop' || 'poster') {
        const validExtensionsFoto = ['jpg', 'png', 'jpeg', 'gif'];
        if (!validExtensionsFoto.includes(extension)) {
            return res.status(400).json({
                msg: `La extension ${extension} no es valida, unicamente archivos ${validExtensionsFoto}`
            });
        }
    } else {
        const validExtensionsVideo = ['mp4', 'avi', 'mkv'];
        if (!validExtensionsVideo.includes(extension)) {
            return res.status(400).json({
                msg: `La extension ${extension} no es valida, unicamente archivos ${validExtensionsVideo}`
            });
        }
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

        res.json({
            msg: 'Archivo subido con existo',
            fileName
        })
    });
}

module.exports = { showFile, updateFile }
