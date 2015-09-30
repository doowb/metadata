

var writeFile = require('write');
var Scaffolds = require('../');

var scaffolds = new Scaffolds({name: 'test'})
  .use(function (app) {
    app.config('scaffold', {files: {}});
    return function (key, file) {
      app.config('scaffold.files.' + key.replace(/\./, '\\.'), file);
    };
  });

scaffolds.addFile('foo', 'foo.hbs');
scaffolds.addFile('bar', 'bar.hbs');
scaffolds.addFile('baz', 'baz.hbs');
scaffolds.addFile('bang', 'bang.hbs');
scaffolds.addFile('boom', 'boom.hbs');

writeFile(__dirname + '/scaffolds.json', JSON.stringify(scaffolds, null, 2));
