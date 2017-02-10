'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var app = express();
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');
var contentedAdmin = require('./lib/contentedAdmin');


module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

var adminConfig = {
  appRoot: __dirname // required config
}

var port = process.env.PORT || 3000;
app.listen(port);

function errorHandler( err, req, res, next, statusCode) {
  console.log('Error handler: ' + err);

  return next();
}

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  app.use(SwaggerUi(swaggerExpress.runner.swagger));

//  app.use(middleware.swaggerValidator({
//        validateResponse: false
//  }));
    
  // install middleware
  swaggerExpress.register(app);


  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
  app.use(errorHandler);
});

contentedAdmin.create(adminConfig, function(middleware) {

  app.use('/admin', middleware.admin );

});
