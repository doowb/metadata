/*!
 * scaffolds <https://github.com/doowb/scaffolds>
 *
 * Copyright (c) 2015, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var Base = require('base-methods');
var utils = require('./lib/utils');
var File = require('./lib/file');

function Scaffolds (props, options) {
  Base.call(this);
  this.options = options || {};

  this.define('props', props || {});
  this.define('plugins', []);

  utils.defaultProperties(this);
  this.set('config', {});
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

Scaffolds.prototype.get = function(key) {
  if (!key || typeof key !== 'string') {
    return;
  }
  return Base.prototype.get.call(this, 'props.' + key);
};

Scaffolds.prototype.set = function(key, val) {
  if (!key) return this;
  if (typeof key === 'object') {
    this.visit('set', key);
  } else {
    if (typeof key !== 'string') return this;
    Base.prototype.set.call(this, 'props.' + key, val);
  }
  return this;
};

Scaffolds.prototype.addFile = function(key, file) {
  if (typeof file === 'object') {
    file = new File(key, file);
  }
  this.props.files[key] = file;

  this.plugins.forEach(function (fn) {
    if (typeof file === 'object') {
      file.use(fn, this.options);
    } else {
      fn.call(this, key, file, this.options);
    }
  }.bind(this));
};

Scaffolds.prototype.config = function(key, val) {
  if (arguments.length === 0) return this.get('config');
  if (arguments.length === 1) return this.get('config.' + key);
  return this.set('config.' + key, val);
};

Scaffolds.prototype.toJSON = function() {
  return this.props;
};

Scaffolds.prototype.load = function(manifest) {
  if (typeof manifest === 'object') {
    return this.visit('set', manifest);
  }
};

module.exports = Scaffolds;
