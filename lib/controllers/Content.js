'use strict';

var url = require('url');


var Content = require('./ContentService');


module.exports.create = function create (req, res, next) {
  Content.create(req.swagger.params, res, next);
};

module.exports.retrieve = function retrieve (req, res, next) {
  Content.retrieve(req.swagger.params, res, next);
};
