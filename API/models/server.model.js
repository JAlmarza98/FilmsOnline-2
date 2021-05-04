const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');
class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        //Rutas backend
        this.userPath = '/api/users';
        this.authPath = '/api/auth';
        this.categoryPath = '/api/categories';
        this.moviePath = '/api/movies';
        this.uploadPath = '/api/uploads';

        // Conexion a la base de datos
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    async connectDB() {
        await dbConnection()
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));

        //Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.userPath, require('../routes/user.routes'));
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.categoryPath, require('../routes/category.routes'));
        this.app.use(this.moviePath, require('../routes/movie.routes'));
        this.app.use(this.uploadPath, require('../routes/upload.routes'));
    }

    listen() {
        this.app.listen(this.port, () => console.log('Servidor corriendo en el puerto', this.port));
    }
}

module.exports = Server;