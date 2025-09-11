const path = require('path');
const fs = require('fs');
const Folder = require('../models/folderModel');
const Image = require('../models/imageModel');


exports.create = async (req, res) => {
    res.render("./forms/folderForm", { title: "Create Folder",user:req.user });
}

exports.createFolder = async (req,res)=>{
    const {foldername,userID} = req.body;

    const result = await Folder.createFolder(foldername,userID);

    const folderPath = path.join(__dirname, '..', 'public', 'folders', foldername);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    res.redirect('/dashboard');
}

exports.detail = async (req,res)=>{
    const folderID = req.params.id;
    console.log(folderID);
    const images = await Image.findImages(folderID);
    console.log(images);
    res.render("detail",{user:req.user,folderID});
}
