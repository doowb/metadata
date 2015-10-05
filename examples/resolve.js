'use strict';

var Docket = require('../');
var plugins = require('./plugins');
var manifest = new Docket();
manifest.use(plugins.resolve());
manifest.load(require('./manifest.json'));

manifest.resolve('https://raw.githubusercontent.com/doowb/capture-stream/master/package.json', function (err, data) {
  if (err) return console.error('ERROR', err);
  manifest.load(data);
  console.log(manifest.toJSON());
});
