'use strict';

var utils = {};

utils.defaultProperties = function (app) {
  app.cache.name = app.cache.name || '';
  app.cache.description = app.cache.description || '';
  app.cache.version = app.cache.version || '0.1.0';
  app.cache.homepage = app.cache.homepage || '';
  app.cache.authors = app.cache.authors || [];
  app.cache.license = app.cache.license || 'MIT';
  app.cache.targets = app.cache.targets || {};
};

module.exports = utils;

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
