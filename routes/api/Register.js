const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const app = express();

const User = require('../../model/User');

router.post('/', (req, res) => {
    const { name, regId, password } = req.body;
    if (!name || !regId || !password) {
        return res.status(400).json({ msg: 'Fill All Fields!' });
    }
    User.findOne({ regId })
        .then(user => {
            if (user) {
                return res.status(400).json({ msg: 'Already Registered!' });
            }
            const newUser = new User({
                name,
                regId,
                password
            });
            bcrypt.genSalt(5, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user._id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
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
        })

})

module.exports = router;