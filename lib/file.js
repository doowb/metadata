'use strict';

var Base = require('base-methods');

function File (key, file) {
  this.key = key;
  if (typeof file === 'string') {
    var content = file;
    file = {content: content};
  }
  Base.call(this, file);
}

Base.extend(File);

File.prototype.use = function(plugin, options) {
  return plugin.call(this, this.key, this, options);
};

File.prototype.toJSON = function() {
  return this;
};

module.exports = File;
