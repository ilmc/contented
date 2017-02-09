'use strict;'
//Include crypto to generate the movie id
var nodeCache = require('node-cache');
var myKeys = new nodeCache();

var JSONPath = require('jsonpath-plus');

exports.create = function(content, callback) {

  id = JSONPath( '$.id', content );

  myKeys.set( JSON.stringify(id), JSON.stringify(content), function( err, success ) {
    if( !err && success ) {
      console.log("Content Saved: " + id + ":" + JSON.stringify(content));
    } else {
      console.log("Failed to save :" + err);
    }
    callback(id);
  });
};

exports.retrieve = function(id, callback) {
  content = myKeys.get( id );

  console.log("Retrieve Content id: " + id + ":" + content);
 
  callback(content);
}
  
