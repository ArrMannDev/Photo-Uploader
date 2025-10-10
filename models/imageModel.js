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

    static async findImages(folderID,offset,limit){
        try{
            if (folderID == null) {
                const [rows] = await db.query("SELECT * FROM image WHERE folderid IS NULL");
                return rows;
            }
            const [rows] = await db.query("SELECT * FROM image WHERE folderid = ? LIMIT ? OFFSET ?",[folderID,limit,offset]);
            return rows;
        }
        catch(error){
            console.log(`Error in findImages: ${error}`);
            throw error;
        }
    }

    static async deleteImage(imageID){
        try{
            const [result] = await db.query("DELETE FROM image WHERE imageid = ?",[imageID]);
            if(result.affectedRows === 1){
                return {success:true};
            }
            else{
                return {success:false,message:"Failed to delete image from database"};
            }
        }
        catch(error){
            console.log(`Error in deleteImage: ${error}`);
            throw error;
        }
    }

    static async deleteChildImages(folderID){
        try{
            const [result] = await db.query("DELETE FROM image WHERE folderid = ?",[folderID]);
            if(result.affectedRows === 1){
                return {success:true};
            }
            else{
                return {success:false,message:"Failed to delete image from database"};
            }
        }
        catch(error){
            console.log(`Error in deleteImage: ${error}`);
            throw error;
        }
    }

    static async countImages(folderID){
        try{
            const [result] = await db.query("SELECT COUNT(*) AS count FROM image WHERE folderid = ?",[folderID]);
            return result[0].count;
        }
        catch(error){
            console.log(`Error in countImages: ${error}`);
            throw error;
        }
    }
}

module.exports = Image;