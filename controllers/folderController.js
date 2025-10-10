const path = require('path');
const fs = require('fs');
const Folder = require('../models/folderModel');
const Image = require('../models/imageModel');


exports.create = async (req, res) => {
    res.render("./forms/folderForm", { title: "Create Folder",user:req.user});
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
    const folderId = req.params.id;
    // console.log(folderId);
    const page = parseInt(req.query.page) || 1;
    const limit= 24;
    const offset = (page - 1) * limit;
    const totalCount = await Image.countImages(folderId); 
    const totalPage = Math.ceil(totalCount/limit);

    const folderName = await Folder.getFolder(folderId);
    // console.log(folderName);
    const images = await Image.findImages(folderId,offset,limit);
    // console.log(images);
    res.render("detail",{user:req.user,folderId,images,folderName,currentPage: page, totalPages: totalPage});
}

exports.deleteFolder = async (req,res)=>{
    const folderId = req.body.folderid;
    const folderName = await Folder.getFolder(folderId);
    await Image.deleteChildImages(folderId);
    //delete real folder
    const folderPath = path.join(__dirname, '..', 'public', 'folders', folderName);
    if (fs.existsSync(folderPath)) {
        fs.rmdirSync(folderPath, { recursive: true });
    }
    await Folder.deleteFolder(folderId);
    res.redirect('/dashboard');
}


exports.authremove = (req,res) =>{
    res.clearCookie('authToken');
    res.redirect('/dashboard');
}
