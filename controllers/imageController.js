const fs = require("fs");
const path = require("path");
const multer = require("multer");
const Image = require("../models/imageModel");
const Folder = require('../models/folderModel');

exports.createImage = async (req, res) => {
  let folderId = req.params.id;
  folderId = folderId ? folderId : "";
  res.render("./forms/imageForm", {
    title: "Create Image",
    user: req.user,
    message: "",
    folderId,
  });
};

exports.uploadImage = async (req, res) => {
    try {
      // Configure multer first
      const storage = multer.diskStorage({
        destination: async (req, _file, cb) => {
        
          let folderId = parseInt(req.body.folderID) || null;
          let uploadDir;
  
          if (folderId) {
            const folderName =await Folder.getFolder(folderId);
            uploadDir = path.join(__dirname, "..", "public","folders", folderName);
          } else {
            uploadDir = path.join(__dirname, "..", "public", "uploads");
          }
  
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }
  
          cb(null, uploadDir);
        },
        
        filename: (_req, file, cb) => {
          cb(
            null,
            file.fieldname + "_" + Date.now() + path.extname(file.originalname)
          );
        },
      });
  
      const uploadImage = multer({ storage }).single("image");
  
      uploadImage(req, res, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
  
        // Now req.body is available
        const folderID = req.body.folderID || null;
        const imageName = req.body.imageName || "Test";
        const imagePath = req.file.filename;
  
        const result = await Image.createImage(imageName, imagePath, folderID);
  
        if (result.success) {
          res.redirect("/dashboard");
        } else {
          res.render("./forms/imageForm", {
            title: "Create Image",
            user: req.user,
            message: result.message,
            folder: "",
          });
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };

exports.deleteImage = async (req, res) => {
    const imageId = req.body.imageid;
    await Image.deleteImage(imageId);
    res.redirect('/dashboard');
  };
  