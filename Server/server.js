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

var oauth = null
var org = nforce.createConnection({
  clientId: '3MVG9xOCXq4ID1uHhtUqMuHpGog1YjljbHSCw0abr583NjRe_Wcz5BLxk4m.QTQpLGmbWXDxm6FrJtfFHlN2L',
  clientSecret: '97071771698148849',
  redirectUri: 'http://localhost:3000/oauth/_callback',
  apiVersion: 'v27.0',  // optional, defaults to current salesforce API version
  environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
  mode: 'multi', // optional, 'single' or 'multi' user mode, multi default
  autoRefresh: true
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

var user  = {}

var users = [
  {
    id: 1,
    name: 'John Smith',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    work_experience: 'did stuff',
    education: 'Berkeley',
    number_of_closes: 14,
    number_of_calls: 100,
    total_sales: 12543,
    total_earnings: 1200,
    created_at: '1 day ago',
    photo_url: 'http://placehold.it/42x42',
    age: 44,
    email: 'boss@teleamericorp.com',
    phone: '(725) 345-1254',
    pending: true
  }
]

app.post('/users', function (req, res) {
  user = _.defaults(req.body, {
    id: 1,
    name: 'John Smith',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    work_experience: 'did stuff',
    education: 'Berkeley',
    number_of_closes: 14,
    number_of_calls: 100,
    total_sales: 12543,
    total_earnings: 1200,
    created_at: '1 day ago',
    photo_url: 'http://placehold.it/42x42',
    age: 44,
    email: 'boss@teleamericorp.com',
    phone: '(725) 345-1254',
    pending: true
  })
  users.push(user)
  res.json(user)
})

app.get('/users', function (req, res) {
  res.json(users)
})

app.get('/products', function (req, res) {
  var params = ['id', 'description__c', 'number_of_leads__c', 'price__c', 'company__c', 'commission_percent__c', 'name__c', 'photo_url__c' ]
  org.query({query: 'SELECT ' + params.join(', ') + ' FROM Product2 where price__c != null', oauth: oauth}, function (err, data) {
    if (err) return console.log(err);


    result = _.map(data.records, function (record) {
      var r = record._fields
      return {
        id: r.id,
        name: r.name__c,
        company: r.company__c,
        description: r.description__c,
        numberOfLeads: Number(r.number_of_leads__c),
        price: Number(r.price__c),
        commissionPercent: Number(r.commission_percent__c),
        photoUrl: r.photo_url__c
      }
    })

    console.log('GET /products', result);
    res.json(result)
  })
})

app.post('/products/:id/accept', function (req, res) {
  var id = req.params.id
  res.json(user)
})

app.get('/leads', function (req, res) {
  var params = ['id', 'name__c', 'company__c', 'industry__c', 'city__c', 'last_contacted__c', 'photo_url__c' ]
  org.query({query: 'SELECT ' + params.join(', ') + ' FROM Lead where name__c != null', oauth: oauth}, function (err, data) {
    if (err) return console.log(err);


    result = _.map(data.records, function (record) {
      var r = record._fields
      return {
        id: r.id,
        name: r.name__c,
        company: r.company__c,
        industry: r.industry__c,
        city: r.city__c,
        lastContacted: r.last_contacted__c,
        photoUrl: r.photo_url__c
      }
    })

    console.log('GET /leads', result);
    res.json(result)
  })
})

app.post('/leads/:id', function (req, res) {
  var id = req.params.id
  var success = req.body.success
  res.json({
    id: id,
    success: success
  })
})

module.exports = function (cb) {
  org.authenticate({ username: S_USERNAME, password: S_PASSWORD}, function(err, _oauth){
    oauth = _oauth
  cb(_oauth, app)
});
}
