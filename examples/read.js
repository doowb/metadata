'use strict';

var Scaffolds = require('../');
var manifest = require('./scaffolds.json');
console.log(manifest);

var scaffolds = new Scaffolds();
scaffolds.load(manifest);

console.log(scaffolds.toJSON());
