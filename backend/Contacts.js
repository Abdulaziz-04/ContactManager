const exp = require('express');
const router = exp.Router();
const auth = require('./auth');
const { Contact, validateContact } = require('./Models');

//list of contacts for specific user
router.get('/', auth, async (req, res) => {
    const con = await Contact.find({ user: req.data.id }).sort('name');
    if (!con) return res.json({ msg: 'No contacts added!' });
    res.json(con);
});

//New contact
router.post('/', auth, async (req, res) => {
    const result = validateContact(req.body);
    if (result.error)
        return res.status(400).json({ msg: result.error.details[0].message });
    const { name, email, type, phone } = req.body;
    const con = new Contact({ name, phone, email, type, user: req.data.id });
    await con.save();
    res.json(con);
});

router.delete('/:id', auth, async (req, res) => {
    const find = await Contact.findByIdAndDelete(req.params.id);
    res.json(find);
});

router.put('/:id', auth, async (req, res) => {
    const find = await Contact.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            type: req.body.type
        },
        { new: true }
    );
    res.json(find);
});

module.exports = router;
