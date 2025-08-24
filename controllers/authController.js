const User = require('../models/userModel');

exports.login = async (req, res) => {
    res.render('./forms/loginForm',{
        title:"Sign In"
    });
} 