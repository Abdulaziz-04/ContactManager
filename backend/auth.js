const jwt = require('jsonwebtoken');
const config = require('config');

//middleware function
function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(404).json({ msg: 'No token found!' });
    try {
        const decode = jwt.verify(token, config.get('jwtSecret'));
        req.data = decode;
        next();
    } catch (ex) {
        res.status(400).json({ msg: 'Something went wrong!Invalid token!' });
    }
}

module.exports = auth;
