/**
 * @fileoverview Centralized place to declare the main Express app and
 * Sequelize db variables so that circular references are
 * avoided when loading models.js, router.js and app.js
 */

// Initialize express app
const express = require('express')
const app = express()
const db = require('./dbmodel')

module.exports = {app, db}
