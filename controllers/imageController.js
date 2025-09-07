const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Image = require('../models/imageModel');

const uploadDir = path.join(__dirname, '..', 'public', 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const uploadImage = multer({
    storage:storage,
}).single('image');


exports.createImage = async (req, res) => {
    res.render("./forms/imageForm", { title: "Create Image",user:req.user, message: "",folder:"" });
}

exports.uploadImage = async (req, res) => {
    try{
        uploadImage(req, res, async (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            else{
                const imagePath = req.file.filename;
                const folderID = req.body.folderID;
                const result = await Image.createImage(imagePath,folderID);
                if(result.success){
                    res.redirect('/dashboard');
                }
                else{
                    res.render("./forms/imageForm", { title: "Create Image",user:req.user, message: result.message,folder:"" });
                }
            }
        })
    }
    catch(err){
        res.status(500).send(err);
    }
}