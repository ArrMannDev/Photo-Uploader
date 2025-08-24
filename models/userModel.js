const db = require('../config/database');
const bcrypt = require('bcrypt');

class User{
    static async createUser(username,email,password){
        try{
            const [rows] = await db.query('INSERT INTO users (username,email,password) VALUES (?,?,?)', [username,email,password]);
            return rows;
        }catch(err){
            throw err;
        }
    }

    static async findUserByEmail(email){
        try{
            const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
            return rows;
        }
        catch(err){
            throw err;
        }
    }

    static async findUser(email, password) {
        try {
          const user = await this.findUserByEmail(email);
      
          if (user.length < 1) {
            return `User with email ${email} not found`;
          }
      
          const passwordResult = await bcrypt.compare(password, row[0].password);
          if (!passwordResult) {
            return `Incorrect password`;
          }
      
          return user[0]; // Password matched, return user
        } catch (err) {
          throw err;
        }
      }
}

module.exports = User