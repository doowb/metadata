'use strict';

var Scaffolds = require('../');
var plugins = require('../lib/plugins');
var scaffolds = new Scaffolds();
scaffolds.use(plugins.resolve());
scaffolds.use(plugins.expand());

var manifest = require('./scaffolds.json');
scaffolds.load(manifest);

scaffolds.expand(scaffolds.toJSON(), function (err, data) {
  if (err) return console.error('ERROR', err);
  scaffolds.load(data);
  console.log(JSON.stringify(scaffolds, null, 2));
});
