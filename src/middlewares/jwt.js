const jwt = require('express-jwt')
const secret = require('../configs/authConfig')

const authenticate = jwt({
    secret: secret.access_token_secret,
    algorithms: ['HS256']
});


module.exports = authenticate