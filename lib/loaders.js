'use strict';

var loaders = [
  setFactory('name'),
  setFactory('description'),
  setFactory('version'),
  setFactory('repository'),
  setFactory('homepage'),
  setFactory('license', 'MIT'),
  authors,
  visitFactory('dependencies'),
  visitFactory('targets'),
  setFactory('config')
];

module.exports = function (manifest) {
  if (typeof manifest !== 'object') {
    return {};
  }

  var len = loaders.length, i = 0;
  while (len--) {
    loaders[i++].call(this, manifest);
  }
  return manifest;
};

function authors (manifest) {
  var current = this.get('authors') || [];
  this.set('authors', current.concat(manifest.authors));
}

function visitFactory (prop) {
  return function (manifest) {
    this.visit(prop, manifest[prop]);
  };
}

function setFactory (prop) {
  return function (manifest) {
    this.set(prop, manifest[prop]);
  };
}
