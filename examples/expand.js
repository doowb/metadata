'use strict';

var Scaffolds = require('../');
var plugins = require('../lib/plugins');
var scaffolds = new Scaffolds();
scaffolds.use(plugins.resolve());
scaffolds.use(plugins.expand());
scaffolds.load(require('./scaffolds.json'));

scaffolds.expand(scaffolds.toJSON(), function (err, data) {
  if (err) return console.error('ERROR', err);
  scaffolds.load(data);
  console.log(scaffolds.toJSON());
});