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

import { User, Round } from './db.mjs';

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
app.delete('/api/rounds/:id', async (req, res) => {
    try {
        const roundId = req.params.id;
        await Round.findByIdAndDelete(roundId);
        res.status(200).json({ message: 'Round deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting round.' });
    }
});

// Get a specific round by course name slug
app.get('/api/rounds/:slug', async (req, res) => {
    const { slug } = req.params;
    const userId = req.user._id;
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
    const userId = req.user.id; 
    console.log("This is the user ID: " + userId)
    const roundData = req.body;

    const round = new Round({
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
    try {
        await round.save();
        res.status(201).json({ message: 'Round added successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error adding round.' });
    }
});

// Update rankings
app.post('/api/rankings', async (req, res) => {
    const userId = req.body.userId || req.user._id; 
    const { rankings } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      user.rankings = rankings;
      await user.save();
  
      res.status(200).json({ message: 'Rankings updated successfully.' });
    } catch (error) {
      console.error('Error updating rankings:', error);
      res.status(500).json({ message: 'Error updating rankings.' });
    }
});
  
  

console.log("Starting server...");
app.listen(process.env.PORT ?? 8080, () => {
    console.log("Server running on port", process.env.PORT ?? 8080);
});
