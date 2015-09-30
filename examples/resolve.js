'use strict';

var Scaffolds = require('../');
var plugins = require('../lib/plugins');
var scaffolds = new Scaffolds();
scaffolds.use(plugins.resolve());
scaffolds.load(require('./scaffolds.json'));

scaffolds.resolve('https://raw.githubusercontent.com/doowb/capture-stream/master/package.json', function (err, data) {
  if (err) return console.error('ERROR', err);
  scaffolds.load(data);
  console.log(scaffolds.toJSON());
});
