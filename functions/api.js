const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');  // Import the cors middleware
const app = express();
const router = express.Router();

const createCheckoutSession = require('../api/checkout');

let records = [];

// Middleware to parse JSON request bodies
app.use(express.json());

// Use cors middleware to allow all origins
app.use(cors());

// Get all students
router.get('/', (req, res) => {
  res.send('App is running..');
});

// Create new record
router.post('/add', async (req, res) => {
  try {
    // Extract relevant information from the request body
    const requestBody = req.body;

    // Do something with the request body, for example, add it to the records array
    // Assuming you have a 'records' array defined somewhere in your code
    records.push(requestBody);

    // Use createCheckoutSession function to create a Stripe Checkout session
    const checkoutSessionResponse = await createCheckoutSession(requestBody);

    // Send a response with the processed data and Checkout session ID
    res.json({
      sessionId: checkoutSessionResponse.sessionId
    });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
  }
});

// Mount the router
app.use('/.netlify/functions/api', router);

// Export the serverless handler
module.exports.handler = serverless(app);
