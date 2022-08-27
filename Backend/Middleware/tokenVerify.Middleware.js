const jwt = require('jsonwebtoken');

// authorization
function verifytoken(req, res, next) {

  if (!token) {
    return res.status(401).send('Access Denied');
  } else {
    var token = req.header('Authorization').split(' ')[1];
  }
  try {
    const verified = jwt.verify(token, 'verySecretValue');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}
module.exports = verifytoken;