import mongoose, { model, Model, Schema } from "mongoose"
import { ModelPlayerType } from '../types'

const PlayerSchema: Schema = new Schema({
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

export const Player: Model<ModelPlayerType> = mongoose.models.Player || model('Player', PlayerSchema);
