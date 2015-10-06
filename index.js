/*!
 * metadata <https://github.com/doowb/metadata>
 *
 * Copyright (c) 2015, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var Base = require('base-methods').namespace('cache');
var option = require('base-options');
var Scaffold = require('scaffold');

var utils = require('./lib/utils');

/**
 * Create a new metadata instance.
 *
 * ```js
 * var metadata = new Metadata();
 * ```
 *
 * @param {Object} `cache` initial cache to use
 * @param {Object} `options` Options to put on the instance.
 * @api public
 */

function Metadata (cache, options) {
  if (!(this instanceof Metadata)) {
    return new Metadata(cache, options);
  }
  Base.call(this);
  this.options = options || {};
  this.use(option);

  this.define('cache', cache || {});
  this.define('plugins', []);

  utils.defaultProperties(this);
  this.set('config', {});
  this.set('isMetadata', true);
}

Base.extend(Metadata);

/**
 * Use plugins on the metadata object. When a plugin returns a function,
 * the function will be run against new targets that are added.
 *
 * @param  {Function} `fn` Plugin function to run.
 * @return {Object} `this` for chaining
 * @api public
 */

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
 *
 * @param {String} `key` Name of the property to add.
 * @param {*} `value` Property to add to the prototype.
 * @api public
 */

Metadata.prototype.mixin = function(key, value) {
  Metadata.prototype[key] = value;
};

/**
 * Add a dependency to the manifest.
 *
 * ```js
 * metadata.addDependency('foo', 'doowb/foo');
 * ```
 *
 * @param {String} `key` Name of the dependency to add.
 * @param {String} `val` Location of the dependency to add (github repo, url);
 * @api public
 */

Metadata.prototype.addDependency = function(key, val) {
  if (typeof key === 'object') {
    return this.visit('addDependency', key);
  }
  return this.set('dependencies.' + key, val);
};

/**
 * Add a has of dependencies to the manifest.
 *
 * ```js
 * metadata.addDependencies({
 *   'foo': 'doowb/foo',
 *   'bar': 'doowb/bar'
 * });
 * ```
 *
 * @param {Object} `deps` Object hash of dependencies to add.
 * @api public
 */

Metadata.prototype.addDependencies = function(deps) {
  return this.visit('addDependency', deps);
};

/**
 * Add a new target configuration to the manifest.
 * The configuration will be expanded using [scaffold][]
 *
 * ```js
 * metadata.addTarget('app', {src: '*.js'});
 * ```
 *
 * @param {String} `key` Name of the target to add.
 * @param {Object} `config` Object describing the configuration of the target.
 * @api public
 */

Metadata.prototype.addTarget = function(key, config) {
  if (typeof key === 'object') {
    return this.visit('addTarget', key);
  }
  var scaffold = new Scaffold(config);
  scaffold.key = scaffold.key || key;
  this.cache.targets[key] = scaffold;
  this.plugins.forEach(function (fn) {
    fn.call(this, scaffold, this.options);
  }.bind(this));
  return this;
};

/**
 * Add an object hash of targets to the manifest.
 *
 * ```js
 * metadata.addTargets({
 *   app: {src: '*.js'},
 *   tests: {src: 'tests/*.js'},
 *   docs: {src: 'docs/*.md'}
 * });
 * ```
 *
 * @param {Object} `config` Object hash of target configurations to add.
 * @api public
 */

Metadata.prototype.addTargets = function(config) {
  return this.visit('addTarget', config);
};

/**
 * Return the actual manifest object to be used
 * when writing out to a json file.
 *
 * ```js
 * fs.writeFileSync('manifest.json', JSON.stringify(metadata, null, 2));
 * ```
 *
 * @return {Object} Object representation of the manifest.
 * @api public
 */

Metadata.prototype.toJSON = function() {
  return this.cache;
};

/**
 * Normalizes a manifest object by passing the manifest through
 * a list of transforms.
 *
 * ```js
 * metadata.normalize(require('./manifest.json'));
 * ```
 *
 * @param  {Object} `manifest` Object representing a manifest to normalize.
 * @return {Object} normalized manifest object
 * @api public
 */

Metadata.prototype.normalize = function(manifest) {
  return utils.transforms.call(this, manifest);
};

/**
 * Load a manifest object onto the metadata cache.
 *
 * ```js
 * metadata.load(require('./manifest.json'));
 * ```
 *
 * @param  {Object} `manifest` Object representing a manifest to load onto the cache.
 * @api public
 */

Metadata.prototype.load = function(manifest) {
  utils.loaders.call(this, this.normalize(manifest));
  return this;
};

/**
 * Expose Metadata
 */

module.exports = Metadata;
