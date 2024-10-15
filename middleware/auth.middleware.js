const jwt = require('jsonwebtoken');

// Middleware function to authenticate requests using JWT
const authMiddleware = (req, res, next) => {
    // Get the token from the request headers (Authorization header)
    const token = req.headers['authorization'];
    // If no token is provided, return a 403 (Forbidden) response
    if (!token) return res.status(403).send('Token is required');
    // Verify the token using the secret key from the environment variables
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Invalid Token');
        // If the token is valid, decode the user information and attach it to the request object
        req.user = decoded;
        // Call the next middleware function in the chain
        next();
    });
};

module.exports = authMiddleware;
