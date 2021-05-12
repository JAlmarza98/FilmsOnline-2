const Movie = require('../models/movie.model');
const Category = require('../models/category.model');

//Get de peliculas publicas
const getMovie = async (req, res) => {
    const resPerPage = 15; // peliculas por pagina
    const { page = 1 } = req.query  // Pagina actual
    let total_pages = 1;


    // validar numero de pagina positivo
    if (parseInt(page) < 1) {
        return res.status(400).json({
            msg: 'El numero de pagina deber ser minimo 1'
        });
    }

    //consulta con paginacion
    const [total_movies, movies] = await Promise.all([
        Movie.countDocuments(),
        Movie.find({ status: true })
            .skip((resPerPage * page) - resPerPage)
            .limit(resPerPage)
            .populate('category', 'name', Category)
    ]);

    //resto de informacion
    let movies_this_page = movies.length;

    if (total_movies % resPerPage === 0) {
        total_pages = total_movies / resPerPage;
    } else {
        total_pages = Math.trunc(total_movies / resPerPage) + 1;
    }

    if (parseInt(page) > total_pages) {
        return res.status(400).json({
            msg: `La pagina ${page} no existe, actualmente solo tenemos ${total_pages} paginas de peliculas`
        })
    }

    res.json({
        page,
        total_pages,
        movies_this_page,
        total_movies,
        movies
    });
}

//Get de todas las peliculas
const getAdminMovies = async (req, res) => {
    const resPerPage = 15; // peliculas por pagina
    const { page = 1 } = req.query  // Pagina actual
    let total_pages = 1;


    // validar numero de pagina positivo
    if (parseInt(page) < 1) {
        return res.status(400).json({
            msg: 'El numero de pagina deber ser minimo 1'
        });
    }

    //consulta con paginacion
    const [total_movies, movies] = await Promise.all([
        Movie.countDocuments(),
        Movie.find()
            .skip((resPerPage * page) - resPerPage)
            .limit(resPerPage)
            .populate('category', 'name', Category)
    ]);

    //resto de informacion
    let movies_this_page = movies.length;

    if (total_movies % resPerPage === 0) {
        total_pages = total_movies / resPerPage;
    } else {
        total_pages = Math.trunc(total_movies / resPerPage) + 1;
    }

    if (parseInt(page) > total_pages) {
        return res.status(400).json({
            msg: `La pagina ${page} no existe, actualmente solo tenemos ${total_pages} paginas de peliculas`
        })
    }

    res.json({
        page,
        total_pages,
        movies_this_page,
        total_movies,
        movies
    });
}

//Get de UNA pelicula
const getOneMovie = async (req, res) => {
    const { id } = req.params;

    const movie = await Movie.findByIdAndUpdate(id);

    res.json(movie);
}

//Crear pelicula
const postMovie = async (req, res) => {

    const { title, year, category, saga, overview, vote_average } = req.body;

    //Comprobar que nos se introduzcan dos veces la misma pelicula
    const movieCheck = await Movie.find({ title: title });

    if (movieCheck.length) {
        return res.status(400).json({
            msg: 'Ya existe una pelicula con ese titulo'
        });
    }

    const date = new Date();
    const movie = new Movie({ title, year, category, saga, overview, vote_average, date });
    movie.save();

    res.json({
        msg: 'Pelicula creada con exito'
    });
}

const putMovie = async (req, res) => {

    const { id } = req.params;
    const { _id, status, ...others } = req.body;

    const movie = await Movie.findByIdAndUpdate(id, others, { new: true });

    res.json(movie);
}

const blockMovie = async (req, res) => {

    const { id } = req.params;

    await Movie.findByIdAndUpdate(id, { status: false });

    res.json({
        msg: 'Pelicula bloqueada con exito'
    });
}

const unblockMovie = async (req, res) => {

    const { id } = req.params;

    await Movie.findByIdAndUpdate(id, { status: true });

    res.json({
        msg: 'La pelicula ha sido liberada'
    });
}


module.exports = { getMovie, getAdminMovies, getOneMovie, postMovie, putMovie, blockMovie, unblockMovie }