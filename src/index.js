'use strict'

const R = require('ramda')
// default private keys
const privateKeys = require('./private-keys')

function upperCaseEnvVariables (object) {
  const isKeyAllUpperCase = (val, key) => key.toUpperCase() === key
  const userVars = R.pickBy(isKeyAllUpperCase, object)
  return userVars
}

function hideSomeVariables (o, names) {
  const hideSpecifiedKeys = (val, key) => {
    return R.contains(key, names) ? '<hidden>' : val
  }
  return R.mapObjIndexed(hideSpecifiedKeys, o)
}

function safeEnv (names, object) {
  names = names || privateKeys
  const ups = upperCaseEnvVariables(object || process.env)
  return hideSomeVariables(ups, names)
}

module.exports = safeEnv

if (!module.parent) {
  console.log(safeEnv())
}
