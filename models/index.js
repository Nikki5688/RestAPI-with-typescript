// Import the Sequelize library and DataTypes for defining models and interacting with the database
const { Sequelize, DataTypes } = require('sequelize');

// Import the database configuration from the config file to establish a connection to the database
const sequelize = require('../config/db');

// Import the User model, which defines the structure and behavior of user data in the database
const User = require('./user.model');

// Initialize an empty object to hold all database models and the Sequelize instance
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
// Add the User model to the db object for easy access throughout the application
db.User = User;

module.exports = db;
