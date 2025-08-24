const jwt = require('jsonwebtoken');

function generateToken(user){
    return jwt.sign({
        userId: user.id,
        email: user.email,
    }, process.env.JWT_SECRET, {
        expiresIn: '48h'
    })
}

module.exports ={
    generateToken
}