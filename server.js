const express = require('express');
const mongoose = require('mongoose');


// Routes
const Auth = require('./routes/api/Auth');
const Register = require('./routes/api/Register');

const config = require('config');

const app = express();

app.use(express.json());

const db = config.get('mongoURI');

mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.log(err);
    });

app.use('/api/auth', Auth);
app.use('/api/register', Register);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
})