'use strict';

var Metadata = require('../');
var manifest = require('./manifest.json');
console.log(manifest);

var metadata = new Metadata();
metadata.load(manifest);

console.log(metadata.toJSON());
