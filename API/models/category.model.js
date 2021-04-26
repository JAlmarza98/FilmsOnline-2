const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Category', CategorySchema);