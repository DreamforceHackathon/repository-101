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
        id: Joi.number(),
        name: Joi.string(),
        company: Joi.string(),
        description: Joi.string(),
        leadCount: Joi.number(),
        pricePoint: Joi.number(),
        commission: Joi.number()
      }))
  })

  it('accepts', function () {
    return flare
      .post('/products/1/accept')
      .expect(200)
  })
})

describe('leads', function () {
  it('gets all', function () {
    return flare
      .get('/leads')
      .expect(200, Joi.array().includes({
        id: Joi.number(),
        productId: Joi.number(),
        name: Joi.string(),
        phone: Joi.string()
      }))
  })

  it('posts', function () {
    return flare
      .post('/leads/1', {success: true})
      .expect(200)
  })
})
