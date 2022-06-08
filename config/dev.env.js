'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
console.log('走dev这里')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL:'"api/"'
})
