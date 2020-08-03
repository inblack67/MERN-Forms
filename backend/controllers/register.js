const User = require('../models/User');

exports.register = async (req, res) => {

    const user = await User.findOne({ email: req.body.email });

    if(user){
        return res.status(401).json({ success: false, msg: 'Email already exists' })
    }

    const newUser = await User.create(req.body);

    return res.status(201).json({ success: true, data: newUser, msg: 'Registration Successfull' })
}