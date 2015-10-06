'use strict';

var transforms = [
  defaultFactory('name', 'manifest'),
  defaultFactory('description', ''),
  defaultFactory('version', '0.1.0'),
  repository,
  homepage,
  authors,
  defaultFactory('license', 'MIT'),
  dependencies,
  targets,
  defaultFactory('config', {})
];

module.exports = function (manifest) {
  if (typeof manifest !== 'object') {
    manifest = {};
  }

  var len = transforms.length, i = 0;
  while (len--) {
    transforms[i++].call(this, manifest);
  }
  return manifest;
};

function repository (manifest) {}
function homepage (manifest) {}

function authors (manifest) {
  var authors = manifest.authors || [];
  authors = Array.isArray(authors) ? authors : [authors];

  if (Array.isArray(manifest.author)) {
    authors = authors.concat(manifest.author);
    delete manifest.author;
  }

  if (typeof manifest.author === 'string') {
    var author = manifest.author;
    delete manifest.author
    authors.push({author: author});
  }

  if (typeof manifest.author === 'object') {
    var author = manifest.author;
    delete manifest.author;
    authors.push(author);
  }

  manifest.authors = authors;
}

function dependencies (manifest) {
  defaultFactory('dependencies', {})(manifest);
}

function targets (manifest) {
  defaultFactory('targets', {})(manifest);
}

function defaultFactory (prop, def) {
  return function (manifest) {
    manifest[prop] = manifest[prop] || def;
  };
}
