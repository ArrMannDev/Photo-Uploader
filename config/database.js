const mysql = require('mysql2/promise');

// const connection = await mysql.createConnection({
//   host: "sql12.freesqldatabase.com",
//   user: "sql12802081",
//   password: "cYKE4kmFuv",
//   database: "sql12802081",
//   port: 3306
// });

// module.exports = connection;

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "photo_uploader",
  port: 3306
});

module.exports = pool;
