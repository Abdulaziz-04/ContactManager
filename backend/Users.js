const exp = require('express');
const router = exp.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { User, validateUser } = require('./Models');

//Register User
router.post('/', async (req, res) => {
    const result = validateUser(req.body);
    if (result.error)
        return res.status(400).json({ msg: result.error.details[0].message });
    const em = await User.findOne({ email: req.body.email });
    if (em)
        return res
            .status(400)
            .json({ msg: 'Email is already registered with another account!' });
    const { name, email, password } = req.body;
    let find = new User({ name, email, password });

    const salt = await bcrypt.genSalt(12);
    find.password = await bcrypt.hash(password, salt);
    await find.save();
    const token = jwt.sign({ id: find._id }, config.get('jwtSecret'));
    res.json({ token });
});

router.get('/', async (req, res) => {
    const result = await User.find().sort('name');
    res.json(result);
});
module.exports = router;
