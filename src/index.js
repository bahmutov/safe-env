'use strict'

const R = require('ramda')
// default private keys
const privateKeys = require('./private-keys')
const replacement = '<hidden>'

function upperCaseEnvVariables (object) {
  const isKeyAllUpperCase = (val, key) => key.toUpperCase() === key
  const userVars = R.pickBy(isKeyAllUpperCase, object)
  return userVars
}

function valueKeyPredicate (keyPredicate) {
  return function (val, key) {
    return keyPredicate(key) ? replacement : val
  }
}

function hideSomeVariables (o, names) {
  const hideSpecifiedKeys = valueKeyPredicate((key) => R.contains(key, names))
  return filterPredicate(hideSpecifiedKeys, o)
}

function filterStringMatches (names, object) {
  const ups = upperCaseEnvVariables(object)
  return hideSomeVariables(ups, names)
}

function filterPredicate (predicate, object) {
  return R.mapObjIndexed(predicate, object)
}

function safeEnv (names = privateKeys, object = process.env) {
  if (Array.isArray(names)) {
    return filterStringMatches(names, object)
  }
  if (typeof names === 'function') {
    return filterPredicate(valueKeyPredicate(names), object)
  }
  throw new Error('Not sure what to do with these arguments')
}

module.exports = safeEnv

if (!module.parent) {
  console.log(safeEnv())
}
