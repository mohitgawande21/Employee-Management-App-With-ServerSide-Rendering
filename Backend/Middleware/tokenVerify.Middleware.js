const jwt = require('jsonwebtoken');
const storage = require('node-sessionstorage')
// authorization
function verifytoken(req, res, next) {
  if(req.headers.authorization){
    var token = req.header('Authorization').split(' ')[1];
    storage.setItem("jwt", token)
  }else{
    
    if (!token) return res.status(401).send('Access Denied');
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