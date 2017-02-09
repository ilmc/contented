'use strict';

var url = require('url');


var Default = require('./DefaultService');


module.exports.hello = function hello (req, res, next) {
  Default.hello(req.swagger.params, res, next);
};
