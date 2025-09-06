const db = require("../config/database");

class Folder {
    static async createFolder(folderName, userID) {
        try {
            const [result] = await db.query(
                "INSERT INTO folder (foldername, userid) VALUES (?, ?)",
                [folderName, userID]
            );
            if (result.affectedRows === 1) {
                return { success: true, folderId: result.insertId };
            } else {
                return { success: false, message: "Failed to insert folder into database" };
            }
        } catch (err) {
            throw err;
        }
    }

    static async getAllFolders(userID){
        try{
            const [rows] = await db.query("SELECT foldername FROM folder Join users ON folder.userid = users.id WHERE users.id = ?",[userID]);
            return rows;
        }
        catch(err){
            console.log(`Error in getAllFolder: ${err}`);
            throw err;
        }
    }
}

module.exports = Folder;