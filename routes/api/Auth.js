const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

const app = express();

const User = require('../../model/User');

router.post('/', (req, res) => {
    const { regId, password } = req.body;
    if (!regId || !password) {
        return res.status(400).json({ msg: 'Enter All Fields!' });
    }
    User.findOne({ regId })
        .then(user => {
            if (!user) {
                return res.status(400).json({ msg: 'Not registered!' });
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(400).json('Password Does Not Match!')
                    }
                    jwt.sign(
                        { id: user._id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) {
                                return res.status(400).json({ msg: 'Error Logging In!' });
                            }
                            res.json({
                                token,
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    regId: user.regId
                                }
                            })
                        }
                    )
                })
        })

})

router.get('/user', auth, (req, res) => {
    User.findById(req.body.id)
        .select('-password')
        .then(user => res.json(user))
});

module.exports = router;