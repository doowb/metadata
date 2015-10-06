'use strict';

var Metadata = require('../');
var plugins = require('./plugins');
var metadata = new Metadata();
metadata.use(plugins.resolve());
metadata.use(plugins.expand());

var manifest = require('./manifest.json');
metadata.load(manifest);

metadata.expand(metadata.toJSON(), function (err, data) {
  if (err) return console.error('ERROR', err);
  metadata.load(data);
  console.log(JSON.stringify(metadata, null, 2));
});
