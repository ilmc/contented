'use strict';

var url = require('url');


var Assignment = require('./AssignmentService');


module.exports.createas = function createas (req, res, next) {
  Assignment.createas(req.swagger.params, res, next);
};

module.exports.retrieveas = function retrieveas (req, res, next) {
  Assignment.retrieveas(req.swagger.params, res, next);
};
