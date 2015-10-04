/*!
 * docket <https://github.com/doowb/docket>
 *
 * Copyright (c) 2015, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var Base = require('base-methods').namespace('cache');
var Scaffold = require('scaffold');

var utils = require('./lib/utils');
var transforms = require('./lib/transforms');
var loaders = require('./lib/loaders');

function Docket (cache, options) {
  if (!(this instanceof Docket)) {
    return new Docket(cache, options);
  }
  Base.call(this);
  this.options = options || {};

  this.define('cache', cache || {});
  this.define('plugins', []);

  utils.defaultProperties(this);
  this.set('config', {});
  this.set('isDocket', true);
}

Base.extend(Docket);

Docket.prototype.use = function(fn) {
  var plugin = fn.call(this, this, this.options);
  if (typeof plugin === 'function') {
    this.plugins.push(plugin);
  }
  this.emit('use');
  return this;
};

/**
 * Add a property to the `Docket` prototype
 */

Docket.prototype.mixin = function(key, value) {
  Docket.prototype[key] = value;
};

Docket.prototype.addDependency = function(key, val) {
  if (typeof key === 'object') {
    return this.visit('addDependency', key);
  }
  return this.set('dependencies.' + key, val);
};

Docket.prototype.addDependencies = function(deps) {
  return this.visit('addDependency', deps);
};

Docket.prototype.addTarget = function(key, config) {
  var scaffold = new Scaffold(config);
  scaffold.key = scaffold.key || key;
  this.cache.targets[key] = scaffold;
  this.plugins.forEach(function (fn) {
    fn.call(this, scaffold, this.options);
  }.bind(this));
};

Docket.prototype.addTargets = function(config) {
  return this.visit('addTarget', config);
};

Docket.prototype.toJSON = function() {
  return this.cache;
};

Docket.prototype.normalize = function(manifest) {
  return transforms.call(this, manifest);
};

Docket.prototype.load = function(manifest) {
  loaders.call(this, this.normalize(manifest));
};

module.exports = Docket;
