const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');
const jwtconfig = require('../jwt-config');
const { request } = require('express');
const { response } = require('express');

exports.registerUser = function (request, response) {

    // Ensure user does not exist first...
    if (await User.findOne({ username: request.body.username }).exec() !== null) {
        response.status(400).send({ msg: "User with that name already exists" });
    }

    const passwordHash = bcrypt.hashSync(request.body.password);

    let newUser = new User({
        username: request.body.username,
        email: request.body.email,
        password: passwordHash
    });

    newUser.save((err, data) => {
        if (err) response.satus(500).send({ msg: "Could not register user. please try again later" });
        response.send(data);
    })
};

exports.login = function (req, res) {
    let user = await User.findOne({ username: request.body.username }).exec();

    if (user === null) {
        response.status(400).send({ msg: "Invalid username or password" });
    }

    bcrypt.compare(request.body.password, user.password)
        .then(function (valid) {
            if (!valid) {
                res.status(400).send({ msg: "Invalid username or password" });
            }

            const token = jwt.sign({ id: user._id }, jwtconfig.secret);
            res
                .header('auth-token', token)
                .send({ auth: true, msg: 'Logged in!' });
        })
        .catch(console.log);
};

exports.updateUser = function (req, res) {
    User.findByIdAndUpdate(request.user.id, request.body, (err, data) => {
        if (err) {
            response.status(400).send({ msg: 'Failed to update user' });
        }

        response.json(data);
    });
};