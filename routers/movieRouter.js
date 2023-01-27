import { Movie } from "../models/movie.js"
import express from "express"

export const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (movie == null) {
            res.send("the movie is not found")
        }
        else {
            res.json(movie);
        }
    }
    catch (error) {
        res.status(404).json({ message: `invalid id: ${error.message}` });
    }
})

router.post('/', async (req, res) => {
    try {
        let regex = /^[a-z/sA-Z]+$/
        const movie = new Movie({
            title: req.body.title
        });
        if (!regex.test(movie.title) || movie.title === null) { 
            res.status(404).json({'message': `invalid title`})
        }
        else {
            await movie.save();
            res.status(200).json('the movie is created successfully')
        }
        
    }
    catch (error) {
        res.status(404).json({ message: `invalid id: ${error.message}` });
    }
})



