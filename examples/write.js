

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
scaffolds.addFile('helpers/helper-issue', 'https://raw.githubusercontent.com/helpers/helper-issue/master/package.json');
scaffolds.addFile('helpers/helper-markdown', 'https://raw.githubusercontent.com/helpers/helper-markdown/master/package.json');
scaffolds.addFile('helpers/helper-related', 'https://raw.githubusercontent.com/helpers/helper-related/master/package.json');
scaffolds.addFile('helpers/helper-reflinks', 'https://raw.githubusercontent.com/helpers/helper-reflinks/master/package.json');
scaffolds.addFile('helpers/helper-date', 'https://raw.githubusercontent.com/helpers/helper-date/master/package.json');
scaffolds.addFile('doowb/handlebars-helpers', 'https://raw.githubusercontent.com/doowb/handlebars-helpers/docs/scaffolds.json');

writeFile(__dirname + '/scaffolds.json', JSON.stringify(scaffolds, null, 2));
