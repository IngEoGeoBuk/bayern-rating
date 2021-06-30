const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
    no: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
});

module.exports = mongoose.models.Player || mongoose.model('Player', PlayerSchema);