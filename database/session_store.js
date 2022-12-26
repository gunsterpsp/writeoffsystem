var mysql = require('mysql');
const session = require("express-session")
require('dotenv').config()
var MySQLStore = require('express-mysql-session')(session);

var options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
};


var connection = mysql.createPool(options)
var sessionStore = new MySQLStore({}, connection);

module.exports = sessionStore;