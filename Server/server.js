var express = require('express');
var app = express();
var twilio = require('twilio');
var bodyParser = require('body-parser')
var _ = require('lodash')

var TWILIO_SID = process.env.TWILIO_SID
var TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
var TWILIO_APP_SID = process.env.twilio_APP_SID

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

app.use(bodyParser.json())

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

var user  = {
  products: []
}

app.post('/users', function (req, res) {
  user = _.defaults(req.body, user)
  res.json(user)
})

app.get('/products', function (req, res) {
  res.json([
    {
      id: 1,
      name: 'umbrella',
      company: 'umbrella corp',
      description: 'The best umbrella ever',
      leadCount: 20,
      pricePoint: 15,
      commission: 0.20
    },
    {
      id: 2,
      name: 'iphone',
      company: 'apple',
      description: 'we\'re watching you',
      leadCount: 100,
      pricePoint: 300,
      commission: 0.05
    }
  ])
})

app.post('/products/:id/accept', function (req, res) {
  var id = req.params.id
  user.products.push(id)
  res.json(user)
})

app.get('/leads', function (req, res) {
  res.json([
    {
      id: 1,
      productId: 1,
      name: 'james',
      phone: '123-456-7890'
    }
  ])
})

app.post('/leads/:id', function (req, res) {
  var id = req.params.id
  var success = req.body.success
  res.json({
    id: id,
    success: success
  })
})

module.exports = app
