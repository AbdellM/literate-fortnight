const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Define a secret key for JWT token
const secretKey = 'my-secret-key';

// Define a function to generate JWT token for a user
function generateToken(user) {
  const payload = {
    username: user.username,
    isAdmin: user.isAdmin, // you can add any other user data to the payload
  };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // the token will expire in 1 hour
}

// Define a function to verify JWT token for a user
function verifyToken(req, res, next) {
  try {
      const token = req.headers.authorization.split(' ')[1]; // get the token from the Authorization header
    const decoded = jwt.verify(token, secretKey);
    req.userData = decoded; // store the decoded user data in the request object for further use
    next(); // call the next middleware function
  } catch (error) {
    return res.status(401).json({
      message: 'Authentication failed. Please log in again.',
    });
  }
}

// Define a function to hash a password
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10); // generate a salt for password hashing
  return bcrypt.hash(password, salt); // hash the password with the salt
}

// Define a function to compare a password with a hashed password
async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

// Define a function to authenticate a user
async function login(req, res) {
    // Get the username and password from the request body
    const { username, password } = req.body;
  
    // Check if the username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }
  
    // Get the user object from the database (in this case, from the JSON file)
    const users = require('./data.json').users;
    const user = users.find(u => u.username === username);
  
    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }
  
    // Check if the password is correct
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }
  
    // Generate a JWT token and send it in the response
    const token = generateToken(user);
    res.json({ token });

    // Log the user in
    console.log('User logged in:', user);
  }

module.exports = {
  generateToken,
  verifyToken, // export verifyToken as a middleware function
  hashPassword,
  comparePassword,
  login,
};
