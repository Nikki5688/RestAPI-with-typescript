const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('user', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin', 'user', 'vendor'), defaultValue: 'user' },
}, {
    timestamps: true, // Enable timestamps
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});

module.exports = User;
