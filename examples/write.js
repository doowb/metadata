

var writeFile = require('write');
var Docket = require('../');

var manifest = new Docket({name: 'test'})
  // .use(function (app) {
  //   app.set('config.scaffold', {files: {}});
  //   return function (scaffold) {
  //     app.set('config.scaffold.files.' + scaffold.key, scaffold);
  //   };
  // });

manifest.addScaffold('foo', 'foo.hbs');
manifest.addScaffold('bar', 'bar.hbs');
manifest.addScaffold('baz', 'baz.hbs');
manifest.addScaffold('bang', 'bang.hbs');
manifest.addScaffold('boom', 'boom.hbs');
manifest.addScaffold('helpers/helper-issue', 'https://raw.githubusercontent.com/helpers/helper-issue/master/package.json');
manifest.addScaffold('helpers/helper-markdown', 'https://raw.githubusercontent.com/helpers/helper-markdown/master/package.json');
manifest.addScaffold('helpers/helper-related', 'https://raw.githubusercontent.com/helpers/helper-related/master/package.json');
manifest.addScaffold('helpers/helper-reflinks', 'https://raw.githubusercontent.com/helpers/helper-reflinks/master/package.json');
manifest.addScaffold('helpers/helper-date', 'https://raw.githubusercontent.com/helpers/helper-date/master/package.json');
manifest.addScaffold('doowb/handlebars-helpers', 'https://raw.githubusercontent.com/doowb/handlebars-helpers/docs/manifest.json');

manifest.addScaffolds({
  app: {src: ['**/*.js', '!examples/**', '!node_modules/**']},
  examples: {options: {cwd: 'examples', flatten: true, expand: true}, src: ['**/*.js']}
});

// console.log(JSON.stringify(manifest, null, 2));

writeFile(__dirname + '/manifest.json', JSON.stringify(manifest, null, 2));
