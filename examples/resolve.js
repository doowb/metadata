'use strict';

var Metadata = require('../');
var plugins = require('./plugins');
var metadata = new Metadata();
metadata.use(plugins.resolve());
metadata.load(require('./manifest.json'));

metadata.resolve('https://raw.githubusercontent.com/doowb/capture-stream/master/package.json', function (err, data) {
  if (err) return console.error('ERROR', err);
  metadata.load(data);
  console.log(metadata.toJSON());
});
