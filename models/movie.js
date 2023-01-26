import mongoose from 'mongoose';
const { Schema } = mongoose;

const MovieSchema = new Schema({
    rating: String,
    title: String,
    cast: [{ id: String }],
    genre: String,
    category: Boolean,
    language: String
});

export const Movies = mongoose.model('MovieModel', MovieSchema);