const mysql = require("mysql2");

const mysqlOption = {
  host: "localhost",
  user: "root",
  password: "",
  database: "testdb",
};

const db = mysql.createPool(mysqlOption);

module.exports = {
  mysqlOption,
  db,
};
