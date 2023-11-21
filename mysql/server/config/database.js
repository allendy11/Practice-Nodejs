const mysql = require("mysql");
const path = require("path");
const dotenv = require("dotenv");

const config = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1231",
  database: "testdb",
  connectionLimit: 100,
};

const db = mysql.createPool(config);

module.exports = { db };
