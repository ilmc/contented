'use strict';

exports.createas = function(args, res, next) {
  /**
   * parameters expected in the args:
  * body (NewAssignment)
  **/
    var examples = {};
  examples['application/json'] = {
  "message" : "aeiou"
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.retrieveas = function(args, res, next) {
  /**
   * parameters expected in the args:
  * secret (String)
  **/
    var examples = {};
  examples['application/json'] = {
  "assignment" : "{}"
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

