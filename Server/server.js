var express = require('express');
var app = express();
var twilio = require('twilio');

var TWILIO_SID = process.env.TWILIO_SID
var TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
var TWILIO_APP_SID = process.env.twilio_APP_SID

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

app.get('/', function(req, res){
  res.send('Hello World!');
});

app.get('/twilioToken', function (req, res) {

  var capability = new twilio.Capability(TWILIO_SID, TWILIO_AUTH_TOKEN);

  //Create a capability token using the TwiML app with sid "AP123", that expires in two minutes

  capability.allowClientIncoming('callForce');
  capability.allowClientOutgoing(TWILIO_APP_SID);
  var token = capability.generate();
  res.json({
    token: token
  })
})


module.exports = app
