'use strict';

var lazy = require('lazy-cache')(require);
var fn = require;
require = module.exports = lazy;
require('mixin-deep', 'merge');
require('./transforms', 'transforms');
require('./loaders', 'loaders');

/**
 * Returns an object of defaults. Called as a
 * method to ensure a new object is created and no
 * references are kept between metadata instances.
 *
 * @return {Object} defaults
 */

var defaults = function () {
  return {
    name: '',
    description: '',
    version: '0.1.0',
    homepage: '',
    repository: '',
    authors: [],
    license: 'MIT',
    dependencies: {},
    targets: {}
  };
};

/**
 * Set default properties on the metadata cache.
 *
 * @param  {Object} `app` metadata instance
 * @return {Object} metadata instance
 */

lazy.defaultProperties = function (app) {
  var obj = lazy.merge({}, defaults(), app.cache);
  return app.set(obj);
};

require = fn;

/**

{
  "name": "scaffolds",
  "description": "Make and read scaffold manifest files.",
  "version": "0.1.0",
  "homepage": "https://github.com/doowb/scaffolds",
  "author": "Brian Woodward (https://github.com/doowb)",
  "repository": "doowb/scaffolds",
  "bugs": {
    "url": "https://github.com/doowb/scaffolds/issues"
  },
  "license": "MIT",
  "files": [
    "index.js"
  ],
  "main": "index.js",
  "engines": {
    "node": ">=0.10.0"
  },
  "scripts": {
    "test": "mocha"
  },
  "devDependencies": {
    "mocha": "*"
  },
  "dependencies": {
    "base-methods": "^0.2.6",
    "lazy-cache": "^0.2.3",
    "write": "^0.2.1"
  }
}

 */
