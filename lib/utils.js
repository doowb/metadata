'use strict';

var lazy = require('lazy-cache')(require);
var fn = require;
require = module.exports = lazy;
require('extend-shallow', 'extend');
require('./transforms', 'transforms');
require('./loaders', 'loaders');

var defaults = {
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

lazy.defaultProperties = function (app) {
  return app.set(lazy.extend({}, defaults, app.cache));
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
