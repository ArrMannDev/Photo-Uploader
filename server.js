const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3000, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});