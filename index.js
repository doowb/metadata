/*!
 * manifest <https://github.com/doowb/manifest>
 *
 * Copyright (c) 2015, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var Base = require('base-methods');
var utils = require('./lib/utils');
var File = require('./lib/file');

function Manifest (props, options) {
  Base.call(this);
  this.options = options || {};

  this.define('props', props || {});
  this.define('plugins', []);

  utils.defaultProperties(this);
  this.set('config', {});
}

Base.extend(Manifest);

Manifest.prototype.use = function(fn) {
  var plugin = fn.call(this, this, this.options);
  if (typeof plugin === 'function') {
    this.plugins.push(plugin);
  }
  this.emit('use');
  return this;
};

Manifest.prototype.get = function(key) {
  if (!key || typeof key !== 'string') {
    return;
  }
  return Base.prototype.get.call(this, 'props.' + key);
};

Manifest.prototype.set = function(key, val) {
  if (!key) return this;
  if (typeof key === 'object') {
    this.visit('set', key);
  } else {
    if (typeof key !== 'string') return this;
    Base.prototype.set.call(this, 'props.' + key, val);
  }
  return this;
};

Manifest.prototype.addFile = function(key, file) {
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

Manifest.prototype.config = function(key, val) {
  if (arguments.length === 0) return this.get('config');
  if (arguments.length === 1) return this.get('config.' + key);
  return this.set('config.' + key, val);
};

Manifest.prototype.toJSON = function() {
  return this.props;
};

Manifest.prototype.save = function(dest, cb) {
  utils.write(dest, JSON.stringify(this, null, 2), cb);
};

module.exports = Manifest;

var manifest = new Manifest({name: 'test'})
  .use(function (app) {
    app.config('scaffold', {files: {}});
    return function (key, file) {
      app.config('scaffold.files.' + key.replace(/\./, '\\.'), file);
    };
  });

manifest.addFile('foo', 'foo.hbs');
manifest.addFile('bar', 'bar.hbs');
manifest.addFile('baz', 'baz.hbs');
manifest.addFile('bang', 'bang.hbs');
manifest.addFile('boom', 'boom.hbs');

manifest.save('manifest.json');
