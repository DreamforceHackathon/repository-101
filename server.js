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
  redirectUri: 'http://callforce.herokuapp.com:3000/oauth/_callback',
  apiVersion: 'v27.0',  // optional, defaults to current salesforce API version
  environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
  mode: 'multi', // optional, 'single' or 'multi' user mode, multi default
  autoRefresh: true
});

var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port %d', server.address().port);
});

app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({secret: 'keyboard cat!!!!!!!!!!', resave: true, saveUninitialized: true}))
app.use(org.expressOAuth({onSuccess: '/home', onError: '/oauth/error'}));  // <--- nforce middleware

// serve company client and assets statically
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/dist'));

//app.get('/', function(req, res){
//  res.send('Hello World!');
//});

app.get('/twilioToken', function (req, res) {

  var capability = new twilio.Capability(TWILIO_SID, TWILIO_AUTH_TOKEN);

  //Create a capability token using the TwiML app with sid "AP123", that expires in two minutes

  capability.allowClientIncoming('callForce');
  capability.allowClientOutgoing(TWILIO_APP_SID);
  var token = capability.generate(10000);
  res.json({
    token: token
  })
})

app.post('/twiML', function (req, res) {
    // Our verified twilio phone number
    var callerId = '8773663032';

    // Number we're calling
    var phoneNumber = req.body.PhoneNumber;

    // Create TwiML response
    var twiml = new twilio.TwimlResponse();
    twiml.dial({
            callerId:callerId
        }, function() {
            this.number(phoneNumber);
        });

    // Return the response
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
})

var user  = {}

var users = [

{
    id: 1,
        name: 'Jackson Palatso',
    summary: '2 years of outbound B2C sales experience in vacuum cleaners. Exceeded sales quota 21 of 24 months.',
    work_experience: '2 year experience in inside sales carrying and exceeding my quota. Currently traveling the US!',
    education: 'Bentley College',
    number_of_closes: 23,
    number_of_calls: 114,
    total_sales: 8000,
    total_earnings: 1200,
    created_at: '270 days ago',
    photo_url: 'http://i.imgur.com/2YqAk3m.jpg',
    age: 23,
    email: 'Jackson@gmail.com',
    phone: '(617) 219-1254',
    pending: true
},

{
    id: 2,
        name: 'Maryann Thomas',
    summary: 'Energetic economics student looking to make extra cash by outbound sales to help pay tuition! Currently president of Kappa Kappa Gamma. Looking to expand upon my retail sales experience!',
    work_experience: 'Currently the president of Kappa Kappa Gamma and the Chess club. Looking to expand upon my retail sales experience!',
    education: 'Vanderbilt University',
    number_of_closes: 4,
    number_of_calls: 37,
    total_sales: 780,
    total_earnings: 117,
    created_at: '20 days ago',
    photo_url: 'http://i.imgur.com/k5AnHjY.jpg',
    age: 19,
    email: 'MaryAnnT@gmail.com',
    phone: '(314) 782-1522',
    pending: true
},

{
    id: 3,
        name: 'Jack Mandelbom',
    summary: 'Career salesman who spent 25 years building and training outbound sales teams across 4 companies! 5x President Club winner. Adviser to the CallForce team and active product user!',
    work_experience: 'Led 4 sales organizations. Exceeded sales quota for 21 of 25 years, Achieved presidents club 5 times. Excited to advise the CallForce team and use the product myself!',
    education: 'Dartmouth College',
    number_of_closes: 21,
        number_of_calls: 192,
    total_sales: 39605,
    total_earnings: 891,
    created_at: '104 days ago',
    photo_url: 'http://i.imgur.com/Q3RaImZ.jpg',
    age: 61,
    email: 'JackM@hotmail.com',
    phone: '(415) 620-2137',
    pending: true
},

{
    id: 4,
        name: 'Jason Mok',
    summary: 'Spent the last 5 years selling broadband cable products to enterprise accounts. Now working full time for CallForce. Love the flexibility to sell multiple products on my schedule!',
    work_experience: 'Was recently laid off and am now working full time for CallForce. Love the flexibility to sell multiple products on my schedule! Hire me and you won’t be disappointed.',
    education: 'UCLA',
    number_of_closes: 99,
    number_of_calls: 1352,
    total_sales: 95713,
    total_earnings: 14357,
    created_at: '217 days ago',
    photo_url: 'http://i.imgur.com/NVGLPKw.jpg',
    age: 29,
    email: 'JasonM@gmail.com',
    phone: '(512) 267-1931',
    pending: true
},

{
    id: 5,
        name: 'Meghan Taylor',
    summary: 'Previously sold automobiles for GM. Set the (still standing) monthly sales record for Detroit’s Chevy dealership! Recently laid off by GM. Now working part-time in auto sales saving the planet one EV at a time!',
    work_experience: 'Was recently laid off by GM. Now working part-time in auto sales for helping to save the planet one EV at a time!',
    education: 'UCLA',
    number_of_closes: 14,
    number_of_calls: 219,
    total_sales: 114357,
    total_earnings: 114357,
    created_at: '217 days ago',
    photo_url: 'http://i.imgur.com/2ZfFg9o.jpg',
    age: 42,
    email: 'MTaylor@aol.com',
    phone: '(231) 631-4123',
    pending: false
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
    org.authenticate({ username: S_USERNAME, password: S_PASSWORD}, function(err, _oauth) {
        oauth = _oauth
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
})

app.post('/products/:id/accept', function (req, res) {
  var id = req.params.id
  res.json(user)
})

app.get('/leads', function (req, res) {
  var params = ['id', 'name__c', 'company__c', 'industry__c', 'city__c', 'last_contacted__c', 'photo_url__c' ]
    org.authenticate({ username: S_USERNAME, password: S_PASSWORD}, function(err, _oauth) {
        oauth = _oauth
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
