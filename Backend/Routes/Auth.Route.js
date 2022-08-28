const express = require('express');
const router = express.Router();
const User = require('../Models/User.Model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: 'API failed'
            })
        }
        let user =  new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
        })
        user.save().then(user => {
            res.json({
                message: 'User Added Successfully!'
            })
        }).catch(error => ({
            message: 'An error occured!'
        }))
    })
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('No user found!');
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Password is incorrect!');

    const token = jwt.sign({ name: user.name }, 'verySecretValue');
    res.header('Authorization', token).json({message: 'User logged in Successfully',token:token});
    
});

module.exports = router;