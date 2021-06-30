const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
    poId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contents: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.models.Rating || mongoose.model('Rating', RatingSchema);
