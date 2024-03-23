require('dotenv').config();



const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

// Enable CORS for all requests
app.use(cors({
  origin: 'http://localhost:3000', // Adjust this to match your frontend URL if different
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify methods you want to allow
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify headers you want to allow
}));

// Middleware for parsing JSON bodies
app.use(express.json());

app.use(morgan('dev'));
// Import middleware
// const authenticateToken = require('./middleware/authenticateToken');

// Import routes
const userRoutes = require('./routes/users');
const serviceListingRoutes = require('./routes/serviceListing');
const reviewRoutes = require('./routes/reviews'); // Ensure you have created this
const bookingRoutes = require('./routes/bookings'); // Ensure you have created this
const favoriteRoutes = require('./routes/favorites'); // Ensure you have created this

// Use routes with the correct API prefix
app.use('/api/users', userRoutes);
app.use('/api/servicelisting', serviceListingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/favorites', favoriteRoutes);

// Test Route - to confirm the server works
app.get('/api/test', (req, res) => {
  res.send('This is a test route! Everything is up and running.');
});

console.log("The TOKEN_SECRET is:", process.env.TOKEN_SECRET);


// app.get('/test-auth', authenticateToken, (req, res) => {
//   console.log("User from token: ", req.user);
//   res.json({ userFromToken: req.user });
// });




// Define the port
const PORT = process.env.PORT || 3004; // Adjust this as per your setup

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


