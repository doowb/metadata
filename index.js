/*!
 * metadata <https://github.com/doowb/metadata>
 *
 * Copyright (c) 2015, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var Base = require('base-methods').namespace('cache');
var Scaffold = require('scaffold');

var utils = require('./lib/utils');

function Metadata (cache, options) {
  if (!(this instanceof Metadata)) {
    return new Metadata(cache, options);
  }
  Base.call(this);
  this.options = options || {};

  this.define('cache', cache || {});
  this.define('plugins', []);

  utils.defaultProperties(this);
  this.set('config', {});
  this.set('isMetadata', true);
}

Base.extend(Metadata);

Metadata.prototype.use = function(fn) {
  var plugin = fn.call(this, this, this.options);
  if (typeof plugin === 'function') {
    this.plugins.push(plugin);
  }
  this.emit('use');
  return this;
};

/**
 * Add a property to the `Metadata` prototype
 */

Metadata.prototype.mixin = function(key, value) {
  Metadata.prototype[key] = value;
};

Metadata.prototype.addDependency = function(key, val) {
  if (typeof key === 'object') {
    return this.visit('addDependency', key);
  }
  return this.set('dependencies.' + key, val);
};

Metadata.prototype.addDependencies = function(deps) {
  return this.visit('addDependency', deps);
};

Metadata.prototype.addTarget = function(key, config) {
  var scaffold = new Scaffold(config);
  scaffold.key = scaffold.key || key;
  this.cache.targets[key] = scaffold;
  this.plugins.forEach(function (fn) {
    fn.call(this, scaffold, this.options);
  }.bind(this));
};

Metadata.prototype.addTargets = function(config) {
  return this.visit('addTarget', config);
};

Metadata.prototype.toJSON = function() {
  return this.cache;
};

Metadata.prototype.normalize = function(manifest) {
  return utils.transforms.call(this, manifest);
};

Metadata.prototype.load = function(manifest) {
  utils.loaders.call(this, this.normalize(manifest));
};

module.exports = Metadata;
