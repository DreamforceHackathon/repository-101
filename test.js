var Flare = require('flare-gun')
var flare = null
var Joi = require('joi')

before(function (done) {
  require('./server')(function (oauth, app) {
    flare = new Flare().express(app)
    done()
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
        id: 1
      })
      .expect(200, {
        id: Joi.any(),
        name: Joi.string(),
        summary: Joi.string(),
        work_experience: Joi.string(),
        education: Joi.string(),
        number_of_closes: Joi.number(),
        number_of_calls: Joi.number(),
        total_sales: Joi.number(),
        total_earnings: Joi.number(),
        created_at: Joi.string(),
        photo_url: Joi.string(),
        age: Joi.number(),
        email: Joi.string(),
        phone: Joi.string(),
        pending: Joi.boolean()
      })
  })
  it('gets', function () {
    return flare
      .get('/users')
      .expect(200, Joi.array().includes({
        id: Joi.any(),
        name: Joi.string(),
        summary: Joi.string(),
        work_experience: Joi.string(),
        education: Joi.string(),
        number_of_closes: Joi.number(),
        number_of_calls: Joi.number(),
        total_sales: Joi.number(),
        total_earnings: Joi.number(),
        created_at: Joi.string(),
        photo_url: Joi.string(),
        age: Joi.number(),
        email: Joi.string(),
        phone: Joi.string(),
        pending: Joi.boolean()
      }))
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

describe('leads', function () {
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
