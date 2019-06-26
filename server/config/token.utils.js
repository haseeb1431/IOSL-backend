const jwt = require('jsonwebtoken');
const keys = require('./authKeys');

const createToken = function(auth) {
    return jwt.sign({ //Dont' increase the token size
            id: auth.id,
            type: auth.type,
            name: auth.name,
            email: auth.email
        }, keys.sessionSecret,
        {
            expiresIn: 60 * 120
        });
};

module.exports = {
  generateToken: function(req, res, next) {
      req.token = createToken(req.auth);
      return next();
  },

  sendToken: function(req, res) {
      res.setHeader('x-auth-token', req.token);
      return res.status(200).send(JSON.stringify(req.user));
  }
};