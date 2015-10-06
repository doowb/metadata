## Description of properties in `manifest.json`

`{`

Name of the repository the manifest file is describing.

`"name": "example-repo",`

Description of the repository the manifest file is describing

`"description": "This repository contains things.",`

Version of this manifest file.

`"version": "0.1.0",`

Location where more information about this repository or manifest file can be found.

`"homepage": "https://github.com/doowb/example-repo",`

Creators of this manifest file.

`"authors": [`

### Author

`{`

Author's name

`"author": "Brian Woodward",`

Author's email address

`"email": "brian.woodward@gmail.com",`

Author's homepage

`"homepage": "https://github.com/doowb"`

`}`

`],`

Repository where the files listed in this manifest can be found.

`"repository": "doowb/scaffolds",`

License

`"license": "MIT",`

### Dependencies

Dependencies point to other manifest files to enable composing manifest files together into a project.

`"dependencies": {`

Example dependency that is named `another-example-repo` and found on github at `doowb/another-example-repo` on branch `dev`

`"another-example-repo": "doowb/another-example-repo#dev"`

`},`

### Targets

Targets describe the groups of files and options this manifest file contains.

```
"targets": {
  "docs": {
    "options": {
    "cwd": "docs",
    "flatten": true,
    "expand": true
    },
    "files": {"docs": "*.md"}
  },
  "tests": {
    "options": {
      "cwd": "tests",
      "flatten": true,
      "expand": true
    },
    "files": {"tests": "*.js"}
  }
}
```

`}`


