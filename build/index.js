/**
 * # Build
 *
 * Handles the scripts defined in 'package.json'
 */

require('babel-register')

var path = require('path')

var SourceLibrary = require('./tasks/src-lib')
var SourceDistribution = require('./tasks/src-dist')

// environment (default mode: development)
global.__DEVELOPMENT__ = !(process.env.NODE_ENV === 'production' || process.argv.length > 2)

var env = {
  SRC: path.resolve(__dirname, '../src'),
  LIB: path.resolve(__dirname, '../lib'),
  DIST: path.resolve(__dirname, '../dist'),
  MODULES: path.resolve(__dirname, '../node_modules')
}

SourceLibrary(env).then(function(){
  // temporary disabled: out of memory | https://github.com/webpack/webpack/issues/2157
  // return SourceDistribution(env)
})
.then(function(){
  console.log('[BUILD]', __DEVELOPMENT__ ? 'WATCH' : 'RELEASE')
})
.catch(console.error.bind(console))
