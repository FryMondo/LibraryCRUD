const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        trim: true
    },
    author_address: {
        type: String,
        trim: true
    },
    year_published: {
        type: Number,
        min: 1000,
        max: 9999
    },
    publisher_address: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        min: 0
    },
    firm_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Firm'
    }
});

module.exports = mongoose.model('Book', bookSchema);
