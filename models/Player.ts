import mongoose, { Document, model, Model, Schema } from "mongoose"

export interface PlayerType extends Document {
    no: number,
    name: string,
    img: string
}

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

export const Player: Model<PlayerType> = mongoose.models.Player || model('Player', PlayerSchema);
