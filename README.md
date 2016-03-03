![typhonjs-npm-build-test](http://i.imgur.com/6ATIGys.png)

[![NPM](https://img.shields.io/npm/v/typhonjs-npm-build-test.svg?label=npm)](https://www.npmjs.com/package/typhonjs-npm-build-test)
[![Code Style](https://img.shields.io/badge/code%20style-allman-yellowgreen.svg?style=flat)](https://en.wikipedia.org/wiki/Indent_style#Allman_style)
[![License](https://img.shields.io/badge/license-MPLv2-yellowgreen.svg?style=flat)](https://github.com/typhonjs-node-npm/typhonjs-npm-build-test/blob/master/LICENSE)
[![Gitter](https://img.shields.io/gitter/room/typhonjs/TyphonJS.svg)](https://gitter.im/typhonjs/TyphonJS)

[![Build Status](https://travis-ci.org/typhonjs-node-npm/typhonjs-npm-build-test.svg?branch=master)](https://travis-ci.org/typhonjs-node-npm/typhonjs-npm-build-test)
[![Coverage](https://img.shields.io/codecov/c/github/typhonjs-node-npm/typhonjs-npm-build-test.svg)](https://codecov.io/github/typhonjs-node-npm/typhonjs-npm-build-test)
[![Dependency Status](https://www.versioneye.com/user/projects/56cea42b6b21e5003abcd590/badge.svg?style=flat)](https://www.versioneye.com/user/projects/56cea42b6b21e5003abcd590)

Provides a unified environment combining the following set of NPM modules / scripts and dependencies for building and testing ES6 NPM modules for TyphonJS and beyond:

- [typhonjs-npm-scripts-build-babel](https://www.npmjs.com/package/typhonjs-npm-scripts-build-babel)
- [typhonjs-npm-scripts-publish](https://www.npmjs.com/package/typhonjs-npm-scripts-publish)
- [typhonjs-npm-scripts-test-mocha](https://www.npmjs.com/package/typhonjs-npm-scripts-test-mocha)

Please refer to the above NPM modules for documentation regarding expanded configuration details specific to each script. All TyphonJS NPM script modules use `.npmscriptrc` found in the root path to store JSON formatted configuration parameters. It should be noted that this NPM module requires NPM 3.0+ as flat packages for the `./node_modules` directory is necessary to easily import the NPM modules linked by `typhonjs-npm-build-test`.

------

To configure all scripts included in `typhonjs-npm-build-test` provide this entry in `package.json` scripts entry:

```
  "devDependencies": {
    "typhonjs-npm-build-test": "^0.0.8"
  },
  "scripts": {
    "build": "babel-node ./node_modules/typhonjs-npm-scripts-build-babel/scripts/build.js",
    "prepublish": "babel-node ./node_modules/typhonjs-npm-scripts-publish/scripts/prepublish.js",
    "test": "babel-node ./node_modules/typhonjs-npm-scripts-test-mocha/scripts/test.js",
    "test-coverage": "babel-node ./node_modules/typhonjs-npm-scripts-test-mocha/scripts/test-coverage.js"
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
      "prepublish": { "scripts": [ "npm run test", "npm run build" ] }
   },

   "test":
   {
      // Provides a `coverage` handling command that is appended when running on Travis CI.
      "travis": { "coverage": "&& cat ./coverage/lcov.info | ./node_modules/codecov.io/bin/codecov.io.js" },

      "istanbul": { "command": "cover", "options": [ "--report lcovonly" ] },
      "mocha": { "source": "./test/src", "options": [ "--compilers js:babel-register", "-t 120000 --recursive" ] }
   }
}
```

Please note that you can add comments to `.npmscriptrc`.
