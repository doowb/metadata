'use strict';

var utils = {};

utils.defaultProperties = function (app) {
  app.props.name = app.props.name || '';
  app.props.description = app.props.description || '';
  app.props.version = app.props.version || '0.1.0';
  app.props.homepage = app.props.homepage || '';
  app.props.authors = app.props.authors || [];
  app.props.license = app.props.license || 'MIT';
  app.props.files = app.props.files || {};
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
