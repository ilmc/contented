'use strict';

var url = require('url');


var Hello = require('./HelloService');


module.exports.hello = function hello (req, res, next) {
  Hello.hello(req.swagger.params, res, next);
};
