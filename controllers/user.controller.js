const jwt = require('jsonwebtoken');

const jwtconfig = require('../jwt-config');
const User = require('../models/user.model');

exports.getMe = function(req, res) {
  const token = req.headers['auth-token'];

  if (!token) {
    // stop user auth validation
    res.status(401).send({ auth: false, msg: 'No token provided.' });
  }

  jwt.verify(token, jwtconfig.secret, function(err, decoded) {
    if (err) {
      res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' });
    }

    User.findOneById(decoded.id, (err, data) => {
        if(err){
            res.status(400).send({msg: 'Coould not find user'});
        }
        res.status(200).send(user);
    });
  });
};