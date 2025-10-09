const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12802081",
  password: "cYKE4kmFuv",
  database: "sql12802081",
  port: 3306
});

module.exports = connection;

