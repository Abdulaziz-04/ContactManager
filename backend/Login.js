const exp = require('express');
const router = exp.Router();
const bcrypt = require('bcryptjs');
const { User } = require('./Models');
const joi = require('joi');
const auth = require('./auth');
const config = require('config');
const jwt = require('jsonwebtoken');

function valid(user) {
    const schema = {
        email: joi
            .string()
            .max(255)
            .required(),
        password: joi
            .string()
            .max(1024)
            .required()
    };
    return joi.validate(user, schema);
}
//Login User
router.post('/', async (req, res) => {
    const result = valid(req.body);
    if (result.error)
        return res.status(400).json({ msg: result.error.details[0].message });
    const find = await User.findOne({ email: req.body.email });
    if (!find)
        return res.status(400).json({ msg: 'Invalid Email or Password' });
    const verify = bcrypt.compare(req.body.password, find.password);
    if (!verify) return res.status(400).json({ msg: 'Incorrect password' });
    const token = jwt.sign({ id: find._id }, config.get('jwtSecret'), {
        expiresIn: 360000
    });
    res.json({ token });
});

//Info on the logged in user
router.get('/', auth, async (req, res) => {
    const find = await User.findById(req.data.id).select('-password');
    if (!find) return res.status(401).json({ msg: 'Unauthorized request' });
    res.json(find);
});

module.exports = router;
