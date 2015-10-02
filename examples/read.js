'use strict';

var Docket = require('../');
var manifest = require('./manifest.json');
console.log(manifest);

var docket = new Docket();
docket.load(manifest);

console.log(docket.toJSON());
