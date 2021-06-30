import mongoose, { Document, model, Model, Schema } from "mongoose"

export interface playerTypes extends Document {
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

export const Player: Model<playerTypes> = mongoose.models.Player || model('Player', PlayerSchema);
