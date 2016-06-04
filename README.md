![typhonjs-npm-build-test](https://i.imgur.com/9hJT6cf.png)

[![NPM](https://img.shields.io/npm/v/typhonjs-npm-build-test.svg?label=npm)](https://www.npmjs.com/package/typhonjs-npm-build-test)
[![Code Style](https://img.shields.io/badge/code%20style-allman-yellowgreen.svg?style=flat)](https://en.wikipedia.org/wiki/Indent_style#Allman_style)
[![License](https://img.shields.io/badge/license-MPLv2-yellowgreen.svg?style=flat)](https://github.com/typhonjs-node-npm-scripts/typhonjs-npm-build-test/blob/master/LICENSE)
[![Gitter](https://img.shields.io/gitter/room/typhonjs/TyphonJS.svg)](https://gitter.im/typhonjs/TyphonJS)

[![Build Status](https://travis-ci.org/typhonjs-node-npm-scripts/typhonjs-npm-build-test.svg?branch=master)](https://travis-ci.org/typhonjs-node-npm-scripts/typhonjs-npm-build-test)
[![Coverage](https://img.shields.io/codecov/c/github/typhonjs-node-npm-scripts/typhonjs-npm-build-test.svg)](https://codecov.io/github/typhonjs-node-npm-scripts/typhonjs-npm-build-test)
[![Dependency Status](https://www.versioneye.com/user/projects/56e5a03ddf573d00495abd11/badge.svg?style=flat)](https://www.versioneye.com/user/projects/56e5a03ddf573d00495abd11)

Requirements: Node v5+ / NPM 3+

Provides a unified environment combining the following set of NPM modules / scripts and dependencies for building, documenting, and testing ES6 NPM modules including instrumentation of JSPM / SystemJS tests for TyphonJS and beyond:

- [typhonjs-istanbul-instrument-jspm](https://www.npmjs.com/package/typhonjs-istanbul-instrument-jspm)
- [typhonjs-node-esdoc](https://www.npmjs.com/package/typhonjs-node-esdoc)
- [typhonjs-npm-scripts-build-babel](https://www.npmjs.com/package/typhonjs-npm-scripts-build-babel)
- [typhonjs-npm-scripts-publish](https://www.npmjs.com/package/typhonjs-npm-scripts-publish)
- [typhonjs-npm-scripts-test-mocha](https://www.npmjs.com/package/typhonjs-npm-scripts-test-mocha)
- [typhonjs-npm-scripts-runner](https://www.npmjs.com/package/typhonjs-npm-scripts-runner)

Please refer to the above NPM modules for documentation regarding expanded configuration details specific to each script. All TyphonJS NPM script modules use `.npmscriptrc` found in the root path to store JSON formatted configuration parameters. It should be noted that this NPM module requires NPM 3.0+ as flat packages for the `./node_modules` directory is necessary to easily import the NPM modules linked by `typhonjs-npm-build-test`.

For the latest significant changes please see the [CHANGELOG](https://github.com/typhonjs-node-npm-scripts/typhonjs-npm-build-test/blob/master/CHANGELOG.md).

Please be aware of a 0.2.0 breaking change in [typhonjs-npm-scripts-test-mocha](https://github.com/typhonjs-node-npm-scripts/typhonjs-npm-scripts-test-mocha/blob/master/CHANGELOG.md#020-2016-06-02)

------

To configure all scripts included in `typhonjs-npm-build-test` provide this entry in `package.json` scripts entry:

```
  "devDependencies": {
    "typhonjs-npm-build-test": "^0.3.0"
  },
  "scripts": {
    "build": "babel-node ./node_modules/typhonjs-npm-scripts-build-babel/scripts/build.js",
    "esdoc": "esdoc -c .esdocrc",
    "eslint": "eslint .",
    "prepublish": "babel-node ./node_modules/typhonjs-npm-scripts-publish/scripts/prepublish.js",
    "test": "babel-node ./node_modules/typhonjs-npm-scripts-test-mocha/scripts/mocha.js",
    "test-coverage": "babel-node ./node_modules/typhonjs-npm-scripts-test-mocha/scripts/mocha-istanbul.js"
  },
```

The following is a standard `.npmscriptrc` file that all TyphonJS NPM modules use:
```
{
   "build":
   {
      "babel": { "source": "src", "destination": "dist" }
   },

   "publish":
   {
      "prepublish": { "scripts": [ "npm run eslint", "npm run test", "npm run build" ] }
   },

   "test":
   {
      // Provides a report handling command that is executed after running tests / coverage when running on Travis CI.
      "travis": 
      { 
         "report": "./node_modules/.bin/codecov",
         "istanbul": { "command": "cover", "options": [ "--report lcovonly" ] }
      },

      "istanbul": { "command": "cover" },
      "mocha": { "source": "./test/src", "options": [ "--compilers js:babel-register", "-t 120000 --recursive" ] }
   }
}
```

Please note that you can add comments to `.npmscriptrc`.
