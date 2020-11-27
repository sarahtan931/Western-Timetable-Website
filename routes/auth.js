const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {
  //const { headers: { authorization } } = req;
  var authorization = req.headers['x-access-token'];
  
  if(authorization) {
    return authorization;
  }
  return null;
};

const auth = {
  required: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    algorithms: ['HS256'] ,
  }),
  optional: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
    algorithms: ['HS256']
  }),
  
};

module.exports = auth;
