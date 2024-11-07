import './config.mjs';
import './db.mjs';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import url from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Round from './db.mjs';

dotenv.config();
const app = express();

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// Middleware
app.use(express.json());

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
        res.redirect('/Home'); // check if this works
    }catch(err){
        res.render('api/rounds', {message: err.message});
    }
});

app.listen(process.env.PORT ?? 3000);
