const { Schema, model } = require('mongoose');

const MovieSchema = Schema({
    title: {
        type: String,
        required: [true, 'El titulo es obligatorio']
    },
    year: {
        type: String,
        required: [true, 'El año es obligatorio']
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    saga: {
        name: {
            type: String
        },
        order: {
            type: Number
        }
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
        type: String
    },
    movie: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Movie', MovieSchema);
