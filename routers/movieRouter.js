import { createConnection } from "mongoose"
import { Movies } from "../models/movie.js"
import { Router, response } from "express"
export const router = new Router();

router.get('/:id', async (req, res) => {
    try {
        let movie = await Movies.findById(req.params.id);
        if (movie === null) {
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
router.post('/createMovie', async (req, res) => {
    try {
        let regex = /[a-zA-Z]/
        if (req.body.title === null || !regex.test(req.body.title)) {
            res.status(404).send('the movie name is not specified');
        }
        else {
            Movies.create(req.body, () => {
                
            });
        }
    }
    catch (error) {
        res.status(404).json({ message: `invalid id: ${error.message}` });
    }
    
})



