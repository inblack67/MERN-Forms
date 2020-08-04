const User = require('../models/User');
const axios = require('axios');

const validateHuman = async (token) => {
    const res = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`);

    return res.data.success;
}

exports.register = async (req, res) => {

    const { formData, reCaptchaToken } = req.body;

    const isHuman = await validateHuman(reCaptchaToken);
    
    if(!isHuman){
        return res.status(400).json({ success: false, msg: 'Are you a robot?' })
    }

    const user = await User.findOne({ email: formData.email });

    if(user){
        return res.status(401).json({ success: false, msg: 'Email already exists' })
    }

    const newUser = await User.create(formData);

    return res.status(201).json({ success: true, data: newUser, msg: 'Registration Successfull' })
}