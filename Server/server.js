var express = require('express');
var app = express();
var twilio = require('twilio');
var bodyParser = require('body-parser')
var _ = require('lodash')
var nforce = require('nforce')
var cookieParser = require('cookie-parser')
var session = require('express-session')

var TWILIO_SID = process.env.TWILIO_SID
var TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
var TWILIO_APP_SID = process.env.twilio_APP_SID

var S_USERNAME = process.env.S_USERNAME
var S_PASSWORD = process.env.S_PASSWORD

var org = nforce.createConnection({
  clientId: '3MVG9xOCXq4ID1uHhtUqMuHpGog1YjljbHSCw0abr583NjRe_Wcz5BLxk4m.QTQpLGmbWXDxm6FrJtfFHlN2L',
  clientSecret: '97071771698148849',
  redirectUri: 'http://localhost:3000/oauth/_callback',
  apiVersion: 'v27.0',  // optional, defaults to current salesforce API version
  environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
  mode: 'multi', // optional, 'single' or 'multi' user mode, multi default
  autoRefresh: true
});


org.authenticate({ username: S_USERNAME, password: S_PASSWORD}, function(err, oauth){
  // store the oauth object for this user
  if (err)  return console.log(err);

  var params = ['id', 'description__c', 'number_of_leads__c', 'price__c', 'company__c', 'commission_percent__c', 'name__c', 'photo_url__c' ]
  org.query({query: 'SELECT ' + params.join(', ') + ' FROM Product2 where price__c != null limit 5', oauth: oauth}, function (err, res) {
    if (err) return console.log(err);
    _.forEach(res.records, function (record) {
      console.log(record._fields);
    })
  })
});


var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({secret: 'keyboard cat!!!!!!!!!!', resave: true, saveUninitialized: true}))
app.use(org.expressOAuth({onSuccess: '/home', onError: '/oauth/error'}));  // <--- nforce middleware


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
