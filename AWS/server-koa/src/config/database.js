const mysql = require("mysql");
const path = require("path");
const dotenv = require("dotenv");

if (process.env.NODE_ENV == "production") {
  dotenv.config({ path: path.join(__dirname, "../../.env.production") });
} else if (process.env.NODE_ENV == "development") {
  dotenv.config({ path: path.join(__dirname, "../../.env.development") });
}

const db_options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1231",
  database: "testdb",
  connectionLimit: 100,
};

const db = mysql.createPool(db_options);

console.log(process.env.NODE_ENV);
console.log(db_options);

module.exports = {
  db,
  db_options,
};
