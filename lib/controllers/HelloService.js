'use strict';

exports.hello = function(args, res, next) {
  /**
   * parameters expected in the args:
  * name (String)
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

