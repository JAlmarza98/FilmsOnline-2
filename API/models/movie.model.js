const { Schema, model } = require('mongoose');

const MovieSchema = Schema({
    title: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    date: {
        type: Date,
        required: [true, 'El mail es obligatorio']
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    saga: {
        type: sagaSchema
    },
    backdrop_path: {
        type: String,
    },
    overview: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    poster_path: {
        type: String,
    },
    vote_average: {
        type: Number
    },
    trailer: {
        type: String,
        required: [true, 'El trailer es obligatorio']
    },
    movie: {
        type: String,
        required: [true, 'La pelicula es obligatoria']
    }
});

const sagaSchema = Schema({
    name: {
        type: String
    },
    order: {
        type: Number,
        default: 0
    }
});

module.exports = model('Movie', MovieSchema);
