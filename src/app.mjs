import './config.mjs';
import './db.mjs';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import url from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User, Round, Prediction } from './db.mjs';

dotenv.config();

const app = express();
app.use(cors());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Golf Stats Management API!');
});

// User registration endpoint
app.post('/api/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username is already taken.' });
        }
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            hash: hashedPassword
        });

        await newUser.save();

        const accessToken = jwt.sign({ id: newUser._id }, process.env.ACCESS_TOKEN_SECRET);

        res.status(201).json({ accessToken: accessToken, message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
});

// User login
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.hash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);

        // If credentials are valid
        res.status(200).json({ accessToken: accessToken, message: 'Login successful.' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user.' });
    }
});

// middleware for authenticating tokens
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: 'Access token required.' });
    }


    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
            return res.status(403).json({ message: 'Invalid token.' });
        }

        req.user = user;
        next(); 
    });
};


// Get all rounds for a logged-in user
app.get('/api/rounds', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    try {
        const rounds = await Round.find({ user: userId });
        res.json(rounds);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving rounds.' });
    }
});

// Delete a specific round
app.delete('/api/rounds/:id', authenticateToken, async (req, res) => {
    try {
        const roundId = req.params.id;
        const userId = req.user.id;
        
        const round = await Round.findById(roundId);

        if(!round){
            return res.status(404).json({ message: 'Round not found. '});
        }

        if(round.user.toString() !== userId){
            return res.status(403).json({ message: 'Not authenticated.'});
        }

        await Round.findByIdAndDelete(roundId);
        res.status(200).json({ message: 'Round deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting round.' });
    }
});

app.get('/api/user', authenticateToken, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('username');
        if(user){
            res.json({ username: user.username });
        }else{
            res.status(404).json({ message: 'User not found.' });
        }
    }catch(error){
        res.status(500).json({ message: 'Error retrieving user details.' });
    }
})

// Get a specific round by course name slug
app.get('/api/rounds/:slug', authenticateToken, async (req, res) => {
    const { slug } = req.params;
    const userId = req.user.id;
    try {
        const round = await Round.findOne({ slug, user: userId });
        if (round) {
            res.json(round);
        } else {
            res.status(404).json({ message: 'Round not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving round.' });
    }
});

// Add a new round
app.post('/api/rounds', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const roundData = req.body;

        const newRound = new Round({
            user: userId,
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

        const savedRound = await newRound.save();

        // Update the user's rounds array
        await User.findByIdAndUpdate(
            userId,
            { $push: { rounds: savedRound._id } },
            { new: true }
        );

        res.status(201).json({ message: 'Round added successfully.', round: savedRound });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add round.' });
    }
});

// get handicap of user
app.get('/api/handicap', authenticateToken, async (req, res) => {
    try {
        const playerId = req.user.id;
        // Populate rounds data from the Round model
        const player = await User.findById(playerId).populate('rounds').exec();

        if (!player) {
            return res.status(404).json({ error: 'Player not found.' });
        }

        const roundsPlayed = player.rounds.length;

        if (roundsPlayed < 5) {
            // Return message if there are fewer than 5 rounds (USUALLY IT'S 20 ROUNDS)
            return res.json({
                message: 'Need at least 5 rounds to calculate handicap.',
                roundsPlayed,
            });
        }

        const differentials = player.rounds.map(round => {
            const { score, courseInfo: { courseRating, slopeRating } } = round;
            return ((score - courseRating) / slopeRating) * 113;
        });

        // Sort differentials and take the lowest 8
        const lowestDifferentials = differentials.sort((a, b) => a - b).slice(0, 8);

        // Calculate the handicap index
        const handicapIndex = (lowestDifferentials.reduce((sum, diff) => sum + diff, 0) / lowestDifferentials.length) * 0.96;

        // Update player's handicap index
        player.handicapIndex = handicapIndex;
        await player.save();

        res.json({ handicapIndex, roundsPlayed });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to calculate handicap index.' });
    }
});

// get scoring average
app.get('/api/scoring-average', authenticateToken, async (req, res) => {
    try {
        const playerId = req.user.id;
        const player = await User.findById(playerId).populate('rounds').exec();

        if (!player) {
            return res.status(404).json({ error: 'Player not found.' });
        }

        //console.log(player.rounds);
        // Check if player has any rounds
        if (!player.rounds || player.rounds.length === 0) {
            return res.json({
                message: 'No rounds available to calculate scoring average.',
                scoringAverage: null, 
            });
        }

        const totalScore = player.rounds.reduce((sum, round) => sum + round.score, 0);
        const scoringAverage = totalScore / player.rounds.length;

        res.json({
            scoringAverage,
            message: null, 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to calculate scoring average.' });
    }
});


// get personal best
app.get('/api/personal-best', authenticateToken, async (req, res) => {
    try {
        const playerId = req.user.id;
        const player = await User.findById(playerId).populate('rounds').exec();

        if (!player) {
            return res.status(404).json({ error: 'Player not found.' });
        }

        //console.log(player.rounds);

        if (!player.rounds || player.rounds.length === 0) {
            return res.json({
                message: 'No rounds available to determine personal best.',
                personalBest: null, 
            });
        }

        const personalBest = Math.min(...player.rounds.map(round => round.score));

        res.json({
            personalBest,
            message: null, 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch personal best score.' });
    }
});


// get latest prediction
app.get('/api/predictions', authenticateToken, async (req, res) => {
    const userId = req.user.id;

    try {
        // Fetch the most recent prediction for the user
        const prediction = await Prediction.find({ user: userId }).sort({ createdAt: -1 }).limit(1);

        if (prediction.length === 0) {
            return res.status(404).json({ message: 'No predictions found.' });
        }

        res.status(200).json(prediction);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching predictions.' });
    }
});

// add a score prediction
app.post('/api/predictions', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const predictionData = req.body;

    const prediction = new Prediction({
        user: userId,
        courseName: predictionData.courseName,
        yardage: predictionData.yardage,
        goalScore: predictionData.goalScore,
        comments: predictionData.comments,
    });

    try {
        await prediction.save();
        res.status(201).json({ message: 'Prediction saved successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error saving prediction.' });
    }
});



console.log("Starting server...");
app.listen(process.env.PORT ?? 8080, () => {
    console.log("Server running on port", process.env.PORT ?? 8080);
});
