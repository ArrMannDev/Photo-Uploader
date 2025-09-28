const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const Folder = require('./models/folderModel');
const Image = require('./models/imageModel');

app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/folders', express.static(path.join(__dirname, 'folders')));



app.set('view engine', 'ejs');
app.set("views",path.join(__dirname,"views"));


const loginRoute = require('./routes/authRoute');
const folderRoute = require('./routes/folderRoute');
const imageRoute = require('./routes/imageRoute');

const auth = require('./middleware/auth');
const jwt = require('./utils/jwt');

app.use('/auth',loginRoute)
app.use('/folder',folderRoute)
app.use('/image',imageRoute)

app.get('/', async (req, res) => {
    const token = req.cookies.authToken;
  
    if (token) {
      return res.redirect('/dashboard'); 
    }
  
    res.render('forms/loginForm', { message: null });
  });
  

app.get('/dashboard', auth, async(req, res) => {
    const folders = await Folder.getAllFolders(req.user.id);
    const folderId= null;
    const images = await Image.findImages(folderId);
    console.log(req.user);
    res.render('index', { user: req.user, folders,images,folderId});
  });

  app.get('/authremove', (req, res) => {
    res.clearCookie('authToken');
    res.redirect('/');
  });
  

app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});