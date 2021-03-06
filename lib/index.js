'use strict';

var mw = require('./express-mw');

var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var fs = require('fs');


// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(__dirname + '/api/swagger.yaml', 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// start the content API's
function content (app, callback) {

  // swaggerRouter configuration
  var options = {
    // swaggerUi: '/swagger.json',
    controllers: __dirname + '/controllers',
    useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
  };

  swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
    // Interpret Swagger resources and attach metadata to request
    app.use(middleware.swaggerMetadata());

    // Validate Swagger requests
    app.use(middleware.swaggerValidator());

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options));

    callback();
  });
}

exports.create = function( app, callback ) {
  console.log('Start Contented Middleware');

  content(app, function() {
 
    callback(mw);
  });
}
