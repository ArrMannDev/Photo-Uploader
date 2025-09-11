const db = require('../config/database');

class Image{
    static async createImage(imageName,imagePath,folderID){
        try{
            const [result] = await db.query("INSERT INTO image (imageURL,folderid,image_name) VALUES (?,?,?)",[imagePath,folderID,imageName]);
            if(result.affectedRows === 1){
                return {success:true,imageID:result.insertId};
            }
            else{
                return {success:false,message:"Failed to insert image into database"};
            }
        }
        catch(error){
            console.log(`Error in createImage: ${error}`);
            throw error;
        }
    }

    static async findImages(folderID){
        try{
            if (folderID == null) {
                const [rows] = await db.query("SELECT * FROM image WHERE folderid IS NULL");
                return rows;
            }
            const [rows] = await db.query("SELECT * FROM image JOIN folder ON image.folderid = folder.folderid WHERE image.folderid = ?",[folderID]);
            return rows;
        }
        catch(error){
            console.log(`Error in findImages: ${error}`);
            throw error;
        }
    }

}

module.exports = Image;