'use strict';

//var db = require('../db');
var nodeCache = require('node-cache');
var myKeys = new nodeCache();
var JSONPath = require('jsonpath-plus');


function createNode(path, contentObject, callback) {

  //console.log('Create Node ' + path + ' ' + JSON.stringify(contentObject));

  //var idObject = JSONPath( '$.id', contentObject )
  var idObject = contentObject.id;
  var id = contentObject.id;
  //var id =  idObject[0];
  //console.log(id + ' ID: ' + JSON.stringify(idObject));

  //var childrenObject = JSONPath( '$.children', contentObject )
  var childrenObject = contentObject.children;
  //console.log(id + ' CH: ' + JSON.stringify(childrenObject));

  //console.log(id + ' CO: ' + JSON.stringify(contentObject));


  //Clone Node
  var node = (JSON.parse(JSON.stringify(contentObject)));

  //console.log(id + ' CN: ' + JSON.stringify(node));
  //console.log(id + ' CHO: ' + JSON.stringify(childrenObject));

  var idpath = path + '/' + id;
  node.id = idpath;

  if(childrenObject != undefined &&  childrenObject.length > 0 ) { 
    // Result from JSON Path

  //  var childrenArray =  childrenObject[0];

  // Clone Children Object
  var childrenArray = (JSON.parse(JSON.stringify(childrenObject)));

  //console.log(id + ' CA: ' + JSON.stringify(childrenArray));

    var childrenIds = JSONPath( '$[*].id', childrenArray )
    //var childrenIds = JSONPath( '$.children..id', contentObject )

    // We will save these against the current object

    // console.log('  CI: ' + JSON.stringify(childrenIds));
    // console.log('  CA: ' + JSON.stringify(childrenArray));

    node.children = childrenIds;

    var c = 0;

    for( var i = 0, len = childrenArray.length; i < len; i++ ) {
      //console.log('  CN: ' + JSON.stringify(childrenArray[i]));
      //console.log('  CC: ' + JSON.stringify(contentObject.children[i]));
      node.children[i] = node.id + '/' + childrenArray[i].id;

      //console.log('  CCT: ' + JSON.stringify(contentObject.children[i]));
      createNode(idpath, contentObject.children[i], function( newnodeid) {
        console.log('Node created ' + newnodeid);
          callback( node.id);

        // Only callback when all the children (& their children have been 
        // created - but not saved

        if(++c == childrenArray.length) {
        }
      });
      
    }
  setTimeout( function () {
          callback( node.id);
  }, 1000);
  } else {
    callback(node.id);
  }

  //console.log(idpath + ' NN: ' + JSON.stringify(node)); - but not saved
}

exports.create = function(args, res, next) {
  /**
   * parameters expected in the args:
  * body (ContentSchema)
  **/

  res.setHeader('Content-Type', 'application/json');

  var contentObject = args.body.value;
  var idObject = JSONPath( '$.id', contentObject )

  //var id = JSON.stringify(idObject);
  var id =  idObject[0];
  var content = JSON.stringify(contentObject);

  myKeys.set( id,  content, function(err, success)  {
    if( !err && success ) {

      createNode('', contentObject, function( newnodeid ) { 
        console.log('Node created ' + newnodeid);

      });

      console.log("Content Saved id: " + id );
      res.end( JSON.stringify({"message" :"Success", "id" : id}) );
    } else {
      console.log("Failed to Save id: " + id );
      //res.end( id );
      res.status(400).send();
    }
  });
}

exports.getContent = function(args, res) {
  res.setHeader('Content-Type', 'application/json');

        var response = JSON.stringify({
          "status" : 400,
          "developerMessage" : "Unknown content path: ",
          "message" : "Object not available",
        });

      res.end( response );

}

exports.retrieve = function(args, res, next) {

  res.setHeader('Content-Type', 'application/json');

  var id = args.name.value;
  //id = JSON.stringify(idObject);

  var response;

  myKeys.get(id, function( err, content ) {
    if( !err ) {
      if(content == undefined) {
        //console.log( "Key NOT Found: " + id );

        var response = JSON.stringify({
          "status" : 400,
          "developerMessage" : "Unknown content path: " + id,
          "message" : "Object not available",
        });
 
        res.status(400).send(response);
      } else {
        //console.log( "Key Found: " + id );
        res.end( content );
      }
    } else {
      console.log( "Error Getting Key: " + id + ": " + err );
      var response = JSON.stringify({
        "status" : 400,
        "developerMessage" : "Filed to get content from store: " + err,
        "message" : "Object not available",
      });
 
      res.status(400).send(response);
    }
  });
}
//
