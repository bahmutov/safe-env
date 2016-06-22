'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')

/* global describe, it */
describe('safe-env', () => {
  const safeEnv = require('safe-env')

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
    la(o.HOME === '<hidden>', o.HOME)
  })
})
