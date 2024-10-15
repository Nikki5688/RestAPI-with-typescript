const sequelize = require('../config/db');// Import the Sequelize database configuration
const jwt = require('jsonwebtoken'); // Import the JWT package to handle token generation
const bcrypt = require('bcryptjs'); // Import bcryptjs to handle password hashing and comparison

// Signup function to register a new user
const signup = async (req, res) => {
    // Destructure the name, email, password, and role from the request body
    const { name, email, password, role } = req.body;
    try {
        // Hash the user's password for security (10 salt rounds)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Define currentDate here
        const currentDate = new Date();

        // Create a new user
        await sequelize.query(
            'INSERT INTO users (name, email, password, role, "createdAt", "updatedAt") VALUES (:name, :email, :password, :role, :createdAt, :updatedAt)',
            {
                replacements: {
                    name,
                    email,
                    password: hashedPassword,
                    role,
                    createdAt: currentDate,
                    updatedAt: currentDate
                }
            }
        );
        // Construct an object to send back the user details (excluding password)
        const userObj = {
            name,     // Return name as provided in the request
            email,    // Return email as provided in the request
            role      // Return role as provided in the request
        };
         // Send a success response 
        res.status(201).json({ message: 'User created successfully!', user: userObj });
    } catch (error) {
        // Log any errors that occur during the signup process
        console.error('Error during signup:', error);
        // Send a 500 status and error message
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


// Login function to authenticate a user
const login = async (req, res) => {
    // Destructure the email and password from the request body
    const { email, password } = req.body;
    try {
        // query the users table to find the user by their email
        const [user] = await sequelize.query('SELECT * FROM users WHERE email = :email', {
            // Replace with the email from the request body
            replacements: { email }, 
            // Specify the query type as SELECT
            type: sequelize.QueryTypes.SELECT
        });

         // If user is not found, return a 401 status for invalid credentials
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token containing the user's id and role
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Send a success response with the JWT token
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Export the signup and login functions for use in other parts of the application
module.exports = { signup, login };
