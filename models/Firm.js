const mongoose = require('mongoose');

const firmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Firm', firmSchema);
