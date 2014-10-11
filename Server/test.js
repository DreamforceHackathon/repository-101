var Flare = require('flare-gun')
var app = require('./server')
var flare = new Flare().express(app)
var Joi = require('joi')

describe('test', function () {
  it('hello', function () {
    return flare
      .get('/')
      .expect(200, 'Hello World!')
  })
})

describe('twilio', function () {
  it('returns a token', function () {
    return flare
      .get('/twilioToken')
      .expect(200, {
        token: Joi.string()
      })
      .flare(function (x) {
        console.log('TWILIO TEMP APP TOKEN:', x.res.body.token);
      })
  })
})
