const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'photo_uploader',
    password:""
});

module.exports = pool.promise();