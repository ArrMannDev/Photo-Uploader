const db = require("../config/database");
const bcrypt = require("bcrypt");

class User {
  static async createUser(username, email, password,profile) {
    try {
      const existingUser = await this.findUserByEmail(email);
      if (existingUser.length > 0) {
        return { success: false, message: `User with email ${email} already exists` };
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await db.query(
        "INSERT INTO users (name, email, password,image) VALUES (?, ?, ?,?)",
        [username, email, hashedPassword,profile]
      );
  
      if (result.affectedRows === 1) {
        return { success: true, userId: result.insertId };
      } else {
        return { success: false, message: "Failed to insert user into database" };
      }
    } catch (err) {
      // Optional: log error for debugging
      console.error("Error in createUser:", err);
      throw err;
    }
  }

  static async findUserByEmail(email) {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      return rows;
    } catch (err) {
      throw err;
    }
  }

  static async findUser(email, password) {
    try {
      const user = await this.findUserByEmail(email);

      if (user.length < 1) {
        return `User with email ${email} not found`;
      }

      const passwordResult = await bcrypt.compare(password, user[0].password);
      if (!passwordResult) {
        return `Incorrect password`;
      }

      return user[0]; // Password matched, return user
    } catch (err) {
      throw err;
    }
  }

  static async findUserById(id) {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  static async editUser(id,username,email,password,image){

    if(image){
      const [result] = await db.query("UPDATE users SET name = ?, email = ?, password = ?, image = ? WHERE id = ?",[username,email,password,image,id]);
      return result.affectedRows;
    }
    
    if(!password){
      const [result] = await db.query("UPDATE users SET name = ?, email = ? WHERE id = ?",[username,email,id]);
      return result.affectedRows;
    }

    const [result] = await db.query("UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",[username,email,password,id]);
    return result.affectedRows;
  }

  static async deleteUser(id){
    const [result] = await db.query("DELETE FROM users WHERE id = ?",[id]);
    return result.affectedRows;
  }
}

module.exports = User;
