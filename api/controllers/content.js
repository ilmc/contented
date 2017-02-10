'use strict';

var util = require('util');
var store = require('../../lib/store');
var JSONPath = require('jsonpath-plus');

// imported packages will be persisted
var packages = require('node-persist');

packages.initSync(
  {
    dir:'content/packages'
  },
  function() {
    console.log('Created Persisted Store');
  }
);

console.log('Inititiated persisted packagestore');

module.exports = {
  create: create,
  retrieve: retrieve,
  getContent: getContent 
};

var contentPackage = function ( body ) {

  this.body = body

  // Body should be valid from the schema
  // We get the id from the id proprty which is a required field

}

contentPackage.prototype.persist = function ( callback ) {

  try {
    var id = this.body.id;
    packages.setItemSync(id, this.body);
    
    console.log('Persisted content package with id: ' + id);

    callback( null, id);

  } catch (ex) {
    callback("Failed to persist content with id: " + id, '0');
  }


  //if(this.body.id == undefined) {
    //callback('ID undefined', '0');
  //} else {
    //packages.setItemSync(this.body.id, this.body);
    
    //console.log('Persisted content package with id: ' + this.body.id);

    //callback( null, this.body.id);
  //}

};

function getContent(req, res) {

  res.setHeader('Content-Type', 'application/json');

  var success = util.format('Success');
  // store.getContent(req.swagger.params, res, null);

  var response = JSON.stringify({
          //"status" : 400,
          "developerMessage" : "Unknown content path: " + req.swagger.params.path.value,
          "message" : "Object not available",
  });

  res.json( response );
}

function create(req, res, next) {
  var success = util.format('Success');
  var response = { 'message': 'Failed', 'reason': 'unknown' };

  var myPackage1 = new contentPackage(req.swagger.params.body.value);

  myPackage1.persist( function( err, id ) {

     if( err ) {
       console.log( err );
       res.status(400);
       response = { 'message': 'Failed to persist package', 'reason': err };
     } else {
       response = { 'message': 'Success', 'id': id };
     }

  res.json( response );

  });


  //var myPackage = req.swagger.params.body.value
  //var id = myPackage.id;

  //packages.setItem(id, myPackage, function() {
  //   console.log('Persisted Package with ID: ' + id);
 
  //   response = { 'message': 'Success', 'status': 200, 'id': id };
  //   res.json( response );
  //});

  //   store.create(req.swagger.params, res, null);
}

function retrieve(req, res) {
  var success = util.format( 'Success');

  // this sends back a JSON response which is a single string
  res.json( success );
}

