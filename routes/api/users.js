const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')

// Bringing in User Model 
const User = require('../../models/User')

// @route  POST api/users
// @desc   Register user
// @access Public *no token needed*
router.post('/', [

    //Register Validations
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please enter a valid email')
        .isEmail(),
    check('password', 'Please enter a password with 6 or more characters')
        .isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //If there are errors then...
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body;

    try {
        // See if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        // Creating a user instance
        user = new User({
            name,
            email,
            password
        })

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save new user to database
        await user.save();

        // Return jsonwebtoken
        res.send('User registered');

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

});

module.exports = router;