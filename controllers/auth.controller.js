const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');
const jwtconfig = require('../jwt-config');
const { request } = require('express');
const { response } = require('express');

exports.registerUser = async function (request, response) {

    // Ensure user does not exist first...
    const t = await User.findOne({ username: request.body.username });
    if (t !== null) {
        response.status(400).send({ msg: "User with that name already exists" });
        return;
    }

    const passwordHash = bcrypt.hashSync(request.body.password);

    let newUser = new User({
        username: request.body.username,
        email: request.body.email,
        password: passwordHash
    });

    newUser.save((err, data) => {
        if (err){
            console.log(err);
            response.status(500).send({ msg: "Could not register user. please try again later" });
            return;
        }
        response.send(data);
    })
};

exports.login = async function (request, res) {
    let user = await User.findOne({ username: request.body.username }).exec();

    if (user === null) {
        res.status(400).send({ msg: "Invalid username or password" });
        return;
    }

    bcrypt.compare(request.body.password, user.password)
        .then(function (valid) {
            if (!valid) {
                res.status(400).send({ msg: "Invalid username or password" });
            }

            const token = jwt.sign({ id: user._id }, jwtconfig.secret);
            res
                .header('access_token', token)
                .send({ auth: true, access_token: token, refresh_token: token});
        })
        .catch(console.log);
};

exports.updateUser = function (request, response) {
    User.findByIdAndUpdate(request.user.id, request.body, (err, data) => {
        if (err) {
            response.status(400).send({ msg: 'Failed to update user' });
        }

        response.json(data);
    });
};