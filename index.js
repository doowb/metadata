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

Docket.prototype.addScaffold = function(key, config) {
  var scaffold = new Scaffold(config);
  scaffold.key = scaffold.key || key;
  this.cache.targets[key] = scaffold;
  this.plugins.forEach(function (fn) {
    fn.call(this, scaffold, this.options);
  }.bind(this));
};

Docket.prototype.addScaffolds = function(config) {
  return this.visit('addScaffold', config);
};

Docket.prototype.toJSON = function() {
  return this.cache;
};

Docket.prototype.load = function(manifest) {
  if (typeof manifest === 'object') {
    if (manifest.isDocket) {
      this.cache = manifest;
      return this;
    }
    var targets = {};
    if (manifest.hasOwnProperty('targets')) {
      targets = manifest.targets;
      delete manifest.targets;
    }
    return this.visit('set', manifest)
      .addScaffolds(targets);
  }
};

module.exports = Docket;
