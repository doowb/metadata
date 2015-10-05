'use strict';

module.exports = function expand (options) {
  return function (app) {
    var async = require('async');
    var re = require('url-regex');
    app.mixin('expand', function (manifest, cb) {
      if (typeof manifest !== 'object') {
        return cb(new TypeError('expand expects manifest to be an object'));
      }
      if (!manifest.hasOwnProperty('targets')) {
        return cb(null, manifest);
      }
      var targets = manifest.targets;
      if (Array.isArray(targets)) {
        return cb(null, manifest);
      }
      var keys = Object.keys(targets);
      async.each(keys, function (key, next) {
        var val = targets[key];
        if (typeof val !== 'object') return next();
        if (!val.hasOwnProperty('files')) return next();
        var files = val.files;
        async.each(files, function (file, nextFile) {
          async.each(file.src, function (src, nextSrc) {
            if (typeof src !== 'string') return nextSrc();
            if (re().test(src) && src.indexOf('manifest.json') > -1) {
              return app.resolve(src, function (err, obj) {
                if (err) {
                  var msg = 'ERROR: <' + src + '> ' + err.message;
                  console.error(msg);
                  return nextSrc();
                }
                // targets[key] = obj;
                console.log('REMOTE FILE:');
                console.log();
                console.log(JSON.stringify(obj, null, 2));
                console.log();
                nextSrc();
              });
            }
            nextSrc();
          }, nextFile);
        }, next);
      }, function (err) {
        if (err) return cb(err);
        cb(null, manifest);
      });
    });
  };
};
