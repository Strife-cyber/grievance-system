import fs from 'fs';
import cors from 'cors';
import path from 'path';
import express from 'express';
import readline from 'readline';
import routes from './routes.js';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors({
    origin: [
        'http://localhost:5173'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Use the built-in body parsers
app.use(bodyParser.json())
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Add API routes
app.use('/api', routes);

// Function to listen for 'q' to quit
function listenForQuitCommand() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', (input) => {
        if (input.trim().toLowerCase() === 'q') {
            console.log("Shutting down server...");
            process.exit(0); // Gracefully exit the server
        } else if (input.trim().toLowerCase() === 'c') {
            console.clear(); // Clear the console
        }
    });
}

// Start the server
app.listen(PORT, () => {
    console.clear();
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log("Press 'q' to quit the server.");
    listenForQuitCommand(); // Start listening for quit command after server starts
});
