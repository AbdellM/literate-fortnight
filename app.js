const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./auth');
const cranesRouter = require('./cranes');
const path = require('path');

// Create an Express application
const app = express();

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse request bodies
app.use(bodyParser.json());

// Login endpoint
app.post('/login', auth.login);

// Authentication middleware
app.use(auth.verifyToken);

// Mount the cranes router at the /cranes endpoint
app.use('/cranes', cranesRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
