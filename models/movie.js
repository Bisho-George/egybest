import mongoose from 'mongoose';
const { Schema } = mongoose;

const MovieSchema = new Schema({
    rating: Number,
    title: String,
    members: [{ id: String }],
    genre: String,
    category: String,
    language: String
});

export const Movie = mongoose.model('Movie', MovieSchema);