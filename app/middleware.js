 // route middleware to verify a token
function middlewareAuthorizationProvider(req, res, next) {
  // baseUrl: '/api/ticket',
  // originalUrl: '/api/ticket/test',
  // Url /test

  var url = req.baseUrl + req._parsedUrl.pathname;

  var urlPublic = ['/', '/api/ticket/FormByTicket', '/api/ticket/test'];

  // public allow all
  if (urlPublic.indexOf(url) > -1) {
    next();
  } else {
    req.decoded = decoded;
    next();
  }
}





module.exports = middlewareAuthorizationProvider;