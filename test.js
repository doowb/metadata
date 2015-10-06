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
  it('should:', function () {
  });

  it('should throw an error:', function () {
    (function () {
      throw new Error('metadata expects valid arguments')
    }).should.throw('metadata expects valid arguments');
  });
});
