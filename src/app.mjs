import './config.mjs';
import './db.mjs';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import url from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { Round } from './db.mjs';

dotenv.config();

const app = express();
app.use(cors());

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// Middleware
app.use(express.json());

// Middleware to add mock user ID if not present
app.use((req, res, next) => {
    // Use a valid MongoDB ObjectId for mock user
    req.user = req.user || { _id: new mongoose.Types.ObjectId('64c5e5c18f293dfed5a4d620') };
    next();
});

// get all rounds for a user
app.get('/api/rounds', async (req, res) => {
    const userId = req.user._id;
    const rounds = await Round.find({ user: userId });
    res.json(rounds);
});

app.delete('/api/rounds/:id', async(req, res) => {
    try{
        const roundId = req.params.id;
        await Round.findByIdAndDelete(roundId);
        res.status(200).json({ message: 'Round deleted successfully' });
    }catch(err){
        res.status(500).json({ message: 'Error deleting round.' });
    }
});

// get a specific round by course name slug
app.get('/api/rounds/:courseNameSlug', async (req, res) => {
    const { courseNameSlug } = req.params;
    const courseName = courseNameSlug.replace(/-/g, ' ');
    const round = await Round.findOne({ courseName, user: req.user._id });
    if (round) {
        res.json(round);
    } else {
        res.status(404).json({ message: 'Round not found' });
    }
});

// add a new round
app.post('/api/rounds', async (req, res) => {
    const roundData = req.body;
    const round = new Round({
        user: req.user._id,
        courseName: roundData.courseName,
        date: new Date(roundData.date),
        score: roundData.score,
        yardage: roundData.yardage,
        courseInfo: {
            coursePar: roundData.coursePar,
            courseRating: roundData.courseRating,
            slopeRating: roundData.slopeRating,
        },
        roundStats: {
            fairways: roundData.fairways,
            GIRs: roundData.GIRs,
            upAndDowns: roundData.upAndDowns,
            putts: roundData.putts,
        },
    });
    try {
        await round.save();
        res.status(201).json({ message: 'Round added successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

console.log("starting server...");
app.listen(process.env.PORT ?? 8080, () => {
    console.log("Server running on port");
});