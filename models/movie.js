import mongoose from 'mongoose';
const { Schema } = mongoose;

const MovieSchema = new Schema({
    rating: {
        type: [String],
        default: []
    },
    watchCount: {
        type: Number,
        default: 0, 
        id: String,
    },
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    members: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'castmembers'
        }],
        required: true,
        validate: [membersLimit, 'Must be at least 3 members']
    },
    genre: {
        type: [{
            type: String,
            enum: [
                'action',
                'comedy',
                'horror',
                'romance',
                'drama',
                'adventure'
            ]
        }],
        required: true
    },
    language: {
        type: String,
        enum: [
            'arabic',
            'english',
            'turkish',
            'hindi'
        ],
        required: true
    }
});

function membersLimit(members) {
    return members.length >= 3;
}

export const Movie = mongoose.model('Movie', MovieSchema);