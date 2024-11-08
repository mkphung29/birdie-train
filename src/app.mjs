import './config.mjs';
import './db.mjs';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import url from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { Round } from './db.mjs';

dotenv.config();

const app = express();

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// Middleware
app.use(express.json());

// get all rounds for a user
app.get('/api/rounds', async (req, res) => {
    const userId = req.user._id;
    const rounds = await Round.find({user: userId});
    res.json(rounds);
})

// get a specific round by course name slug
app.get('/api/rounds/:courseNameSlug', async (req, res) => {
    const {courseNameSlug} = req.params;
    const courseName = courseNameSlug.replace(/-/g, ' ');
    const round = await Round.findOne({courseName, user: req.user._id});
    if(round) {
        res.json(round);
    }else{
        res.status(404).json({message: 'Round not found'});
    }
})


// add a new round
app.post('/api/rounds', async (req, res) => {
    const roundData = req.body;
    const round = new Round({
        user: req.user._id,
        courseName: roundData.courseName,
        data: new Date(roundData.date),
        score: roundData.score,
        yardage: roundData.yardage,
        courseInfo: {
            coursePar: roundData.coursePar,
            courseRating: roundData.courseRating,
            slopeRating: roundData.slopeRating
        },
        roundStats: {
            fairways: roundData.fairways,
            GIRs: roundData.GIRs,
            upAndDowns: roundData.upAndDowns,
            putts: roundData.putts,
        },
    });
    try{
        await round.save();
        res.status(201).json({ message: 'Round added successfully'});
    }catch(err){
        res.status(500).json( { message: err.message });
    }
});

console.log("starting server...");
app.listen(process.env.PORT ?? 8080, () => {
    console.log("Server running on port 8080");
});

/*
import express from 'express';

console.log("Express imported successfully");

const app = express();
const port = 8080;

try {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.error("Error starting the server:", error);
}*/