var Flare = require('flare-gun')
var flare = null
var Joi = require('joi')

before(function (done) {
  require('./server')(function (oauth, app) {
    flare = new Flare().express(app)
    done()
  })
})

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

describe('users', function () {
  it('creates', function () {
    return flare
      .post('/users', {
        id: 1,
        data: 123
      })
      .expect(200, {
        id: 1,
        data: 123,
        products: Joi.array()
      })
  })
})

describe('products', function () {
  it('gets all', function () {
    return flare
      .get('/products')
      .expect(200, Joi.array().includes({
        id: Joi.any(),
        name: Joi.string(),
        company: Joi.string(),
        description: Joi.string(),
        numberOfLeads: Joi.number(),
        price: Joi.number(),
        commissionPercent: Joi.number(),
        photoUrl: Joi.string()
      }))
  })

  it('accepts', function () {
    return flare
      .post('/products/1/accept')
      .expect(200)
  })
})

describe.only('leads', function () {
  it('gets all', function () {
    return flare
      .get('/leads')
      .expect(200, Joi.array().includes({
        id: Joi.any(),
        name: Joi.string(),
        company: Joi.string(),
        industry: Joi.string(),
        city: Joi.string(),
        lastContacted: Joi.any(),
        photoUrl: Joi.string()
      }))
  })

  it('posts', function () {
    return flare
      .post('/leads/1', {success: true})
      .expect(200)
  })
})
