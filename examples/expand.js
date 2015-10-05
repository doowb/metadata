'use strict';

var Docket = require('../');
var plugins = require('./plugins');
var docket = new Docket();
docket.use(plugins.resolve());
docket.use(plugins.expand());

var manifest = require('./manifest.json');
docket.load(manifest);

docket.expand(docket.toJSON(), function (err, data) {
  if (err) return console.error('ERROR', err);
  docket.load(data);
  console.log(JSON.stringify(docket, null, 2));
});
