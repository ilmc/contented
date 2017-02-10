'use strict';

var mw = require('./contented-express-mw');

exports.create = function( config, callback ) {
  console.log('Start Contented Middleware');

  callback(mw);
}
