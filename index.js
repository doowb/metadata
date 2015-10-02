/*!
 * scaffolds <https://github.com/doowb/scaffolds>
 *
 * Copyright (c) 2015, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var Base = require('base-methods').namespace('cache');
var Scaffold = require('scaffold');

var utils = require('./lib/utils');

function Scaffolds (cache, options) {
  if (!(this instanceof Scaffolds)) {
    return new Scaffolds(cache, options);
  }
  Base.call(this);
  this.options = options || {};

  this.define('cache', cache || {});
  this.define('plugins', []);

  utils.defaultProperties(this);
  this.set('config', {});
  this.set('isScaffolds', true);
}

Base.extend(Scaffolds);

Scaffolds.prototype.use = function(fn) {
  var plugin = fn.call(this, this, this.options);
  if (typeof plugin === 'function') {
    this.plugins.push(plugin);
  }
  this.emit('use');
  return this;
};

/**
 * Add a property to the `Scaffolds` prototype
 */

Scaffolds.prototype.mixin = function(key, value) {
  Scaffolds.prototype[key] = value;
};

Scaffolds.prototype.addScaffold = function(key, config) {
  var scaffold = new Scaffold(config);
  scaffold.key = scaffold.key || key;
  this.cache.scaffolds[key] = scaffold;
  this.plugins.forEach(function (fn) {
    fn.call(this, scaffold, this.options);
  }.bind(this));
};

Scaffolds.prototype.addScaffolds = function(config) {
  return this.visit('addScaffold', config);
};

Scaffolds.prototype.toJSON = function() {
  return this.cache;
};

Scaffolds.prototype.load = function(manifest) {
  if (typeof manifest === 'object') {
    if (manifest.isScaffolds) {
      this.cache = manifest;
      return this;
    }
    var scaffolds = {};
    if (manifest.hasOwnProperty('scaffolds')) {
      scaffolds = manifest.scaffolds;
      delete manifest.scaffolds;
    }
    return this.visit('set', manifest)
      .addScaffolds(scaffolds);
  }
};

module.exports = Scaffolds;
