'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')
const R = require('ramda')

/* global describe, it */
describe('safe-env', () => {
  const safeEnv = require('safe-env')
  const hidden = '<hidden>'

  it('returns an object', () => {
    const o = safeEnv()
    la(is.object(o), o)
  })

  it('does not hide HOME value by default', () => {
    const o = safeEnv()
    la(o.HOME !== '<hidden>', o.HOME)
  })

  it('hides HOME value when told to', () => {
    const o = safeEnv(['HOME'])
    la(o.HOME === hidden, o.HOME)
  })

  it('returns only uppercase keys', () => {
    const o = safeEnv()
    const keys = R.keys(o)
    const upper = R.map(R.toUpper, keys)
    la(R.equals(keys, upper), 'not all uppercase', o)
  })

  it('can take use object instead', () => {
    const o = {FOO: 42, BAR: 'bar'}
    const out = safeEnv(['FOO'], o)
    la(out.FOO === hidden, out)
    la(out.BAR === 'bar', out)
  })

  it('can use predicate function', () => {
    const o = {foo: 42, bar: 'bar'}
    const hideKey = (key) => key === 'foo'
    const out = safeEnv(hideKey, o)
    la(is.object(out), 'returns an object', out)
    la(out.foo === hidden, 'hides foo', out)
    la(out.bar === o.bar, 'does not hide bar', out)
  })

  it('can filter all "token" values', () => {
    const o = {
      foo: 42,
      myToken: 'secret',
      'another-token': 'very secret'
    }
    const tokenName = (key) => key.toLowerCase().indexOf('token') !== -1
    const out = safeEnv(tokenName, o)
    la(is.object(out))
    la(out.myToken === hidden)
    la(out['another-token'] === hidden)
  })
})
