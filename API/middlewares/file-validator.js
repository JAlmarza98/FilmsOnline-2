
const fileValidator = (req, res, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.data) {

        return res.status(400).json({
            msg: 'No hay archivos que subir.'
        });
    }

    next();
}

module.exports = {
    fileValidator
}