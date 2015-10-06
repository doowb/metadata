/*!
 * metadata <https://github.com/doowb/metadata>
 *
 * Copyright (c) 2015 .
 * Licensed under the MIT license.
 */

'use strict';

/* deps:mocha */
var assert = require('assert');
var should = require('should');
var Metadata = require('./');

describe('metadata', function () {
  it('should create an instance', function () {
    var metadata = new Metadata();
    assert(metadata instanceof Metadata);
  });

  it('should create an instance without using `new`', function () {
    var metadata = Metadata();
    assert(metadata instanceof Metadata);
  });

  it('should mixin a method on the prototype', function () {
    var metadata = new Metadata();
    metadata.mixin('foo', function (msg) {
      return 'foo ' + msg;
    });
    assert.equal(typeof Metadata.prototype.foo, 'function');
    assert.equal(typeof metadata.foo, 'function');
    assert.equal(metadata.foo('bar'), 'foo bar');

    var another = new Metadata();
    assert.equal(typeof another.foo, 'function');
    assert.equal(another.foo('bar'), 'foo bar');
  });

  it('should use plugins', function () {
    var metadata = new Metadata();
    metadata.use(function (app) {
      app.bar = function (msg) {
        return 'bar ' + msg;
      };
    });

    assert.equal(typeof Metadata.prototype.bar, 'undefined');
    assert.equal(typeof metadata.bar, 'function');
    assert.equal(metadata.bar('baz'), 'bar baz');
  });

  it('should use target plugins', function () {
    var output = [];
    var metadata = new Metadata();
    metadata.use(function (app) {
      app.bar = function (msg) {
        return 'bar ' + msg;
      };
      return function (target, options) {
        output.push(target.key);
      };
    });

    assert.equal(typeof Metadata.prototype.bar, 'undefined');
    assert.equal(typeof metadata.bar, 'function');
    assert.equal(metadata.bar('baz'), 'bar baz');
    assert.equal(metadata.plugins.length, 1);

    metadata.addTarget('tests', {src: 'test.js'});
    assert.deepEqual(output, ['tests']);
  });

  it('should add a dependency to dependencies', function () {
    var metadata = new Metadata();
    metadata.addDependency('foo', 'doowb/foo');
    assert.deepEqual(metadata.cache.dependencies, {'foo': 'doowb/foo'});
  });

  it('should add an object of dependencies to dependencies', function () {
    var metadata = new Metadata();
    metadata.addDependencies({
      'foo': 'doowb/foo',
      'bar': 'doowb/bar',
      'baz': 'doowb/baz'
    });
    assert.deepEqual(metadata.cache.dependencies, {
      'foo': 'doowb/foo',
      'bar': 'doowb/bar',
      'baz': 'doowb/baz'
    });
  });

  it('should add an object of dependencies to dependencies with addDependency', function () {
    var metadata = new Metadata();
    metadata.addDependency({
      'foo': 'doowb/foo',
      'bar': 'doowb/bar',
      'baz': 'doowb/baz'
    });
    assert.deepEqual(metadata.cache.dependencies, {
      'foo': 'doowb/foo',
      'bar': 'doowb/bar',
      'baz': 'doowb/baz'
    });
  });

  it('should add a target to targets', function () {
    var metadata = new Metadata();
    metadata.addTarget('foo', {src: 'foo.js'});
    var expected = {
      'foo': {
        isScaffold: true,
        files: [{src: ['foo.js'], dest: '', options: {}, name: 'scaffold'}],
        options: {},
        key: 'foo'
      }
    };
    assert.deepEqual(metadata.cache.targets, expected);
  });

  it('should add an object of targets to targets', function () {
    var metadata = new Metadata();
    metadata.addTargets({
      'foo': {src: 'foo.js'},
      'bar': {src: 'bar.js'},
      'baz': {src: 'baz.js'}
    });
    var expected = {
      'foo': {
        isScaffold: true,
        files: [{src: ['foo.js'], dest: '', options: {}, name: 'scaffold'}],
        options: {},
        key: 'foo'
      },
      'bar': {
        isScaffold: true,
        files: [{src: ['bar.js'], dest: '', options: {}, name: 'scaffold'}],
        options: {},
        key: 'bar'
      },
      'baz': {
        isScaffold: true,
        files: [{src: ['baz.js'], dest: '', options: {}, name: 'scaffold'}],
        options: {},
        key: 'baz'
      }
    };
    assert.deepEqual(metadata.cache.targets, expected);
  });

  it('should add an object of targets to targets with addTarget', function () {
    var metadata = new Metadata();
    metadata.addTarget({
      'foo': {src: 'foo.js'},
      'bar': {src: 'bar.js'},
      'baz': {src: 'baz.js'}
    });
    var expected = {
      'foo': {
        isScaffold: true,
        files: [{src: ['foo.js'], dest: '', options: {}, name: 'scaffold'}],
        options: {},
        key: 'foo'
      },
      'bar': {
        isScaffold: true,
        files: [{src: ['bar.js'], dest: '', options: {}, name: 'scaffold'}],
        options: {},
        key: 'bar'
      },
      'baz': {
        isScaffold: true,
        files: [{src: ['baz.js'], dest: '', options: {}, name: 'scaffold'}],
        options: {},
        key: 'baz'
      }
    };
    assert.deepEqual(metadata.cache.targets, expected);
  });

  it('should return a manifest object from toJSON', function () {
    var metadata = new Metadata();
    metadata.addDependencies({
      'foo': 'doowb/foo',
      'bar': 'doowb/bar',
      'baz': 'doowb/baz'
    });
    metadata.addTarget({
      'foo': {src: 'foo.js'},
      'bar': {src: 'bar.js'},
      'baz': {src: 'baz.js'}
    });
    assert.deepEqual(metadata.toJSON(), metadata.cache);
  });

  it('should load an existing manifest object onto the cache', function () {
    var metadata = new Metadata();
    metadata.addDependencies({
      'foo': 'doowb/foo',
      'bar': 'doowb/bar',
      'baz': 'doowb/baz'
    });
    metadata.addTarget({
      'foo': {src: 'foo.js'},
      'bar': {src: 'bar.js'},
      'baz': {src: 'baz.js'}
    });

    var another = new Metadata();
    another.load(metadata.toJSON());
    assert.deepEqual(another.cache, metadata.cache);
  });

  describe('transforms', function () {
    it('should load defaults when the manifest is not an object', function () {
      var metadata = new Metadata();
      metadata.load('foo');
      assert.deepEqual(metadata.cache, { name: 'manifest',
        description: '',
        version: '0.1.0',
        homepage: undefined,
        repository: undefined,
        authors: [],
        license: 'MIT',
        dependencies: {},
        targets: {},
        config: {},
        isMetadata: true
      });
    });

    it('should normalize an `author` array into `authors` array', function () {
      var metadata = new Metadata();
      var author = {author: 'Brian Woodward', email: 'brian.woodward@gmail.com', homepage: 'https://github.com/doowb'};
      metadata.load({author: [author]});
      assert.deepEqual(metadata.get('authors'), [author]);
    });

    it('should normalize an `author` object into `authors` array', function () {
      var metadata = new Metadata();
      var author = {author: 'Brian Woodward', email: 'brian.woodward@gmail.com', homepage: 'https://github.com/doowb'};
      metadata.load({author: author});
      assert.deepEqual(metadata.get('authors'), [author]);
    });

    it('should normalize an `authors` object into `authors` array', function () {
      var metadata = new Metadata();
      var author = {author: 'Brian Woodward', email: 'brian.woodward@gmail.com', homepage: 'https://github.com/doowb'};
      metadata.load({authors: author});
      assert.deepEqual(metadata.get('authors'), [author]);
    });

    it('should normalize an `author` string into `authors` array', function () {
      var metadata = new Metadata();
      var author = {author: 'Brian Woodward'};
      metadata.load({author: 'Brian Woodward'});
      assert.deepEqual(metadata.get('authors'), [author]);
    });
  });

  describe('loaders', function () {
    it('should concat `authors` on manifest to existing `authors`', function () {
      var metadata = new Metadata();
      metadata.set('authors', [{author: 'Jon Schlinkert'}]);
      var author = {author: 'Brian Woodward'};
      metadata.load({author: 'Brian Woodward'});
      assert.deepEqual(metadata.get('authors'), [{author: 'Jon Schlinkert'}, {author: 'Brian Woodward'}]);
    });
  });
});
