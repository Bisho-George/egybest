import express from 'express';
import { CastMember } from '../models/castMember.js';

export const router = express.Router();

router.get("/", async (req, res) => {
    try {
        res.status(200).json(await CastMember.find());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const member = await CastMember.findById(req.params.id);
        if (member == null) {
            res.status(404).json({ message: "Cast member not found" });
        } else {
            res.status(200).json(member);
        }
    } catch (error) {
        res.status(400).json({ message: "Invalid ID"});
    }
})

router.post("/", async (req, res) => {
    try {
        const member = new CastMember({
            name: req.body.name,
            movies: req.body.movies,
            role: req.body.role
        });
        res.status(201).json(await member.save());
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
