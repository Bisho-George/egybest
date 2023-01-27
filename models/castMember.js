import mongoose from 'mongoose'
const { Schema } = mongoose;

const castMemberSchema = new Schema({
    role: {
        type: String,
        enum: ['director', 'author', 'actor'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    movies: [{ type: String }]
});

export const CastMember = mongoose.model('CastMember', castMemberSchema);