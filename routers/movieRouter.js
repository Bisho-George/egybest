import { Movie } from "../models/movie.js"
import express from "express"
import { CastMember } from "../models/castMember.js";
import { captureRejectionSymbol } from "events";

export const router = express.Router();



router.post('/rate', async (req, res) => {
    try {
        const movie = await Movie.findOne({
            title: req.body.title
        })
        await movie.updateOne({
            rating: req.body.rating
        })
    }
    catch (error) {
        res.status(404).json(`${error}`);
    }
    
})





// TODO: Rate movies


router.get("/search", async (req, res) => {
    try {
        const query = [];

        if (req.query.title == null && req.query.genre == null && req.query.language == null) {
            res.status(404).json([]);
        } else {

            if (req.query.title != null) {
                query.push({ title: { $regex: '.*' + req.query.title + '.*' } });
            }

            if (req.query.genre != null) {
                query.push({ genre: req.query.genre });
            }

            if (req.query.language != null) {
                query.push({ language: req.query.language })
            }

            const results = await Movie.find({
                $and: query
            });

            res.status(200).json(results);
        }

    } catch (error) {
        res.status(404).json("No results")
    }
})

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
router.get('/:id/watch', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        movie.watchCount++;
        await movie.save();
        res.json(movie.url);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

router.post('/', async (req, res) => {
    try {
        let regex = /^[a-zA-Z\s\-]+$/;
        const movie = new Movie({
            title: req.body.title,
            members: req.body.members,
            genre: req.body.genre,
            language: req.body.language,
            url: req.body.url
        });

        if (!regex.test(movie.title) || movie.title == null) {
            res.status(404).json({ 'message': `invalid title` })
        }
        else {
            const newMovie = await movie.save();
            for (let castMemberId of req.body.members) {
                const castMember = await CastMember.findById(castMemberId);
                castMember.movies = [...castMember.movies, newMovie._id];
                await castMember.save();
            }
            res.status(200).json('the movie is created successfully')
        }

    }
    catch (error) {
        res.status(404).json({ message: `invalid id: ${error.message}` });
    }
})



