require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importing CORS
const transactionRoutes = require('./routes/transactionRoutes'); // Importing transaction routes

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3000' // Allow requests from your React frontend
}));

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Transaction API!');
});

// Routes
app.use('/api/transactions', transactionRoutes); // Define your transaction routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
