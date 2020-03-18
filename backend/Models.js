const db = require('mongoose');
const joi = require('joi');
joi.id = require('joi-objectid')(joi);

//CREATING THE USERS MODEL
const userSchema = new db.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200
    },
    email: {
        type: String,
        required: true,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const User = db.model('users', userSchema);

function validateUser(user) {
    const schema = {
        name: joi
            .string()
            .min(3)
            .max(200)
            .required(),
        password: joi
            .string()
            .min(5)
            .max(1024)
            .required(),
        email: joi
            .string()
            .email()
            .max(255)
            .required(),
        date: joi.date()
    };
    return joi.validate(user, schema);
}
module.exports.validateUser = validateUser;
module.exports.User = User;

//CREATING CONTACTS MODEL
const contactSchema = new db.Schema({
    user: {
        type: db.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true
    },
    phone: {
        type: Number,
        minlength: 3,
        maxlength: 100,
        required: true,
        unique: true
    },
    email: {
        type: String,
        minlength: 7,
        maxlength: 255
    },
    type: {
        type: String,
        default: 'personal'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

function validateContact(contact) {
    const schema = {
        name: joi
            .string()
            .min(3)
            .max(255)
            .required(),
        phone: joi
            .number()
            .min(3)
            .required(),
        email: joi
            .string()
            .min(7)
            .max(255),
        type: joi.string()
    };
    return joi.validate(contact, schema);
}

const Contact = db.model('contacts', contactSchema);

module.exports.Contact = Contact;
module.exports.validateContact = validateContact;
