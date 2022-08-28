const jwt = require('jsonwebtoken');

// authorization
function verifytoken(req, res, next) {
  if(req.headers.authorization){
    var token = req.header('Authorization').split(' ')[1];
  }else{
    
    if (!token) return res.status(401).send('Access Denied');
  }
  try {
    const verified = jwt.verify(token, 'verySecretValue');
    console.log(req.user)
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}


module.exports = verifytoken;