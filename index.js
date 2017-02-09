'use strict';

var express = require('express')
var app = express()
var http = require('http');

var contented = require('./lib/index');

var swaggerTools = require('swagger-tools');

var jsyaml = require('js-yaml');
var fs = require('fs');

//var options = {
//  swaggerUi: '/swagger.json',
//  controllers: __dirname + '/lib/controllers',
//  useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
//};

var spec = fs.readFileSync(__dirname + '/lib/api/swagger.yaml', 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

contented.create( app, function (middleware) {

  app.use('/admin', middleware.admin );

  http.createServer(app).listen(3000, function () {
    console.log('Contented listening on port 3000!')
  });

  // Start apps which depend on content here

});

swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  app.use(middleware.swaggerUi());
});



