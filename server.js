const express = require('express');
const db = require('./models'); 
const bodyParser = require('body-parser');
const authRoutes = require('./routes/user.routes');
const cors = require('cors');
const port = 8000;

const app = express();
// Middleware to parse incoming JSON data in the request body
app.use(express.json());
// Enable CORS to allow requests from different origins
app.use(cors());

// Syncing the Sequelize models with the database
db.sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database Synced');
    })
    .catch((err) => {
        console.log("Error: ", err);
    });

// Use the authentication routes for handling requests starting with "/api"
app.use('/api', authRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
