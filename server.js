const exp = require('express');
const app = exp();
const db = require('mongoose');
const users = require('./backend/Users');
const contacts = require('./backend/Contacts');
const login = require('./backend/Login');
const config = require('config');
const path = require('path');

if (!config.get('jwtSecret')) throw new Error('Set env variable');
const url = config.get('MongoURI');
db.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log('Connected to Database'))
    .catch(err => {
        console.error(err.message);
    });

app.use(exp.json());
app.use('/api/users', users);
app.use('/api/login', login);
app.use('/api/contacts', contacts);

//Setup production environment
if (process.env.NODE_ENV === 'production') {
    app.use(exp.static('frontend/build'));
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening to port ${port}`));
