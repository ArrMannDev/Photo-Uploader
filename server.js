const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src')));

app.set('view engine', 'ejs');
app.set("views",path.join(__dirname,"views"));

const loginRoute = require('./routes/authRoute');
app.use('/auth',loginRoute)

app.get("/", (req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});