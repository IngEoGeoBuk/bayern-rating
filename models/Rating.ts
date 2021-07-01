import mongoose, { model, Model } from "mongoose"
import { ModelRatingType } from '../types'

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

export const Rating: Model<ModelRatingType> = mongoose.models.Rating || model('Rating', RatingSchema);