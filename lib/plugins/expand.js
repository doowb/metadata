'use strict';

module.exports = function expand (options) {
  return function (app) {
    var async = require('async');
    var re = require('url-regex');
    app.mixin('expand', function (manifest, cb) {
      if (typeof manifest !== 'object') {
        return cb(new TypeError('expand expects manifest to be an object'));
      }
      if (!manifest.hasOwnProperty('files')) {
        return cb(null, manifest);
      }
      var files = manifest.files;
      if (Array.isArray(files)) {
        return cb(null, manifest);
      }
      var keys = Object.keys(files);
      async.each(keys, function (key, next) {
        var val = files[key];
        if (typeof val !== 'string') return next();
        if (re().test(val) && val.indexOf('package.json') > -1) {
          return app.resolve(val, function (err, obj) {
            if (err) return next(err);
            files[key] = obj;
            next();
          });
        }
        next();
      }, function (err) {
        if (err) return cb(err);
        cb(null, manifest);
      });
    });
  };
};
