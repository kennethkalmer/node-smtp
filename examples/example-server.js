/*===============================================
	File:      example-server.js

	Author:    Micheil Smith
	Description:
		An example of the node-smtp server.

		(Not Implemented)
===============================================*/

var smtp = require("../lib/smtp");

var server = new smtp.Server();
server.runServer();

var sys = require('sys');
//server.addListener('connect', function( args ) {
//  var remoteHost = args[0];
//  var promise = args[1];
//  sys.puts( 'connect callback' );
//  promise.emitError("I don't like your type [" + remoteHost +"]");
//});

//server.addListener( 'ehlo', function( args ) {
//  sys.puts( 'ehlo callback' );
//  var hostname = args[0];
//  var promise = args[1];
//  // no 'true' passed as final parameter, won't close the connection
//  promise.emitError("What kind of hostname is '" + hostname + "' anyway?");
//});

server.addListener( 'recipient', function( args ) {
  sys.puts( 'recipient callback' );
  var recipient = args[0];
  var promise   = args[1];

  if( recipient == 'kenneth.kalmer@gmail.com' ) {
    promise.emitSuccess();
  } else {
    promise.emitError( "No such user here", true );
  }
});

server.addListener( 'sender', function( args ) {
  sys.puts( 'sender callback' );
  var sender = args[0];
  var promise = args[1];

  if( sender == 'kenneth.kalmer@gmail.com' ) {
    promise.emitSuccess();
  } else {
    promise.emitError( "You're not welcome here", true );
  }
});
