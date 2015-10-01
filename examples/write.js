

var writeFile = require('write');
var Scaffolds = require('../');

var scaffolds = new Scaffolds({name: 'test'})
  // .use(function (app) {
  //   app.set('config.scaffold', {files: {}});
  //   return function (scaffold) {
  //     app.set('config.scaffold.files.' + scaffold.key, scaffold);
  //   };
  // });

scaffolds.addScaffold('foo', 'foo.hbs');
scaffolds.addScaffold('bar', 'bar.hbs');
scaffolds.addScaffold('baz', 'baz.hbs');
scaffolds.addScaffold('bang', 'bang.hbs');
scaffolds.addScaffold('boom', 'boom.hbs');
scaffolds.addScaffold('helpers/helper-issue', 'https://raw.githubusercontent.com/helpers/helper-issue/master/package.json');
scaffolds.addScaffold('helpers/helper-markdown', 'https://raw.githubusercontent.com/helpers/helper-markdown/master/package.json');
scaffolds.addScaffold('helpers/helper-related', 'https://raw.githubusercontent.com/helpers/helper-related/master/package.json');
scaffolds.addScaffold('helpers/helper-reflinks', 'https://raw.githubusercontent.com/helpers/helper-reflinks/master/package.json');
scaffolds.addScaffold('helpers/helper-date', 'https://raw.githubusercontent.com/helpers/helper-date/master/package.json');
scaffolds.addScaffold('doowb/handlebars-helpers', 'https://raw.githubusercontent.com/doowb/handlebars-helpers/docs/scaffolds.json');

scaffolds.addScaffolds({
  app: {src: ['**/*.js', '!examples/**', '!node_modules/**']},
  examples: {options: {cwd: 'examples', flatten: true, expand: true}, src: ['**/*.js']}
});

// console.log(JSON.stringify(scaffolds, null, 2));

writeFile(__dirname + '/scaffolds.json', JSON.stringify(scaffolds, null, 2));
