'use strict';

module.exports = function resolve (options) {
  return function (app) {
    var request = require('request');
    app.mixin('resolve', function (uri, cb) {
      var opts = {url: uri};
      request(opts, function (err, res, body) {
        if (err) return cb(new Error(err));
        if (res.statusCode !== 200) return cb(new Error(res.statusMessage));
        try {
          var data = JSON.parse(body);
          return cb(null, data);
        } catch (err) {
          return cb(err);
        }
      });
    });
  };
};
