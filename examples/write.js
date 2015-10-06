

var writeFile = require('write');
var Metadata = require('../');

var metadata = new Metadata({name: 'test'})
  // .use(function (app) {
  //   app.set('config.scaffold', {files: {}});
  //   return function (scaffold) {
  //     app.set('config.scaffold.files.' + scaffold.key, scaffold);
  //   };
  // });

metadata.addTarget('foo', 'foo.hbs');
metadata.addTarget('bar', 'bar.hbs');
metadata.addTarget('baz', 'baz.hbs');
metadata.addTarget('bang', 'bang.hbs');
metadata.addTarget('boom', 'boom.hbs');
metadata.addTarget('helpers/helper-issue', 'https://raw.githubusercontent.com/helpers/helper-issue/master/package.json');
metadata.addTarget('helpers/helper-markdown', 'https://raw.githubusercontent.com/helpers/helper-markdown/master/package.json');
metadata.addTarget('helpers/helper-related', 'https://raw.githubusercontent.com/helpers/helper-related/master/package.json');
metadata.addTarget('helpers/helper-reflinks', 'https://raw.githubusercontent.com/helpers/helper-reflinks/master/package.json');
metadata.addTarget('helpers/helper-date', 'https://raw.githubusercontent.com/helpers/helper-date/master/package.json');
metadata.addTarget('doowb/handlebars-helpers', 'https://raw.githubusercontent.com/doowb/handlebars-helpers/docs/manifest.json');

metadata.addTargets({
  app: {src: ['**/*.js', '!examples/**', '!node_modules/**']},
  examples: {options: {cwd: 'examples', flatten: true, expand: true}, src: ['**/*.js']}
});

// console.log(JSON.stringify(metadata, null, 2));

writeFile(__dirname + '/manifest.json', JSON.stringify(metadata, null, 2));
