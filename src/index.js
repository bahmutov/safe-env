'use strict'

const R = require('ramda')
const privateKeys = require('./private-keys')

function upperCaseEnvVariables () {
  const isKeyAllUpperCase = (val, key) => key.toUpperCase() === key
  const userVars = R.pickBy(isKeyAllUpperCase, process.env)
  return userVars
}

function hideSomeVariables (o, names) {
  const hideSpecifiedKeys = (val, key) => {
    return names.includes(key) ? '<hidden>' : val
  }
  return R.mapObjIndexed(hideSpecifiedKeys, o)
}

function safeEnv (names) {
  names = names || privateKeys
  const ups = upperCaseEnvVariables()
  return hideSomeVariables(ups, names)
}

module.exports = safeEnv

if (!module.parent) {
  console.log(safeEnv())
}
