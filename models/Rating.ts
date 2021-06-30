import mongoose, { Document, model, Model, Schema } from "mongoose"

export interface ratingTypes extends Document {
    poId: string,
    email: string,
    contents: string,
    rating: number,
}

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

export const Rating: Model<ratingTypes> = mongoose.models.Rating || model('Rating', RatingSchema);