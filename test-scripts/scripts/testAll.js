'use strict';

/**
 * testAll -- Initiates a special testing process with Istanbul and Mocha invoking an all inclusive test
 * `./test-scripts/mocha/TestScriptsRunner.js` which runs all TyphonJS NPM scripts directly so that they are
 * instrumented by Istanbul. It should be noted that this is a special testing setup as `npm-scripts.json` test section
 * contains data pertaining to the test itself. Normally one would add a script entry in `package.json` like the
 * following: `"test-coverage": "babel-node ./node_modules/typhonjs-npm-scripts-test-mocha/scripts/test-coverage.js"`
 * and add the corresponding test setup data to `npm-scripts.json`.
 */

var cp = require('child_process');
var fs = require('fs-extra');

// Append test source glob
var mochaOptions = '-t 120000 --recursive ./test-scripts/mocha/TestScriptsRunner.js';

// Includes only the TyphonJS node_modules NPM scripts. Outputs to `coverage-test`.
var istanbulOptions = "--no-default-excludes -i '[ **/node_modules/typhonjs-npm-scripts-build-babel/scripts/** " +
 "**/node_modules/typhonjs-npm-scripts-publish/scripts/** " +
  "**/node_modules/typhonjs-npm-scripts-test-mocha/scripts/** ]' --dir coverage-test";

var exec;

/**
 * If running on Travis CI only generate lcov data and pipe to Codecov.
 */
if (process.env.TRAVIS)
{
   exec = './node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha ' + istanbulOptions
    +' --report lcovonly -- ' + mochaOptions
     + ' && ./node_modules/.bin/codecov';
}
else
{
   exec = './node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha ' + istanbulOptions + ' -- '
    + mochaOptions;
}

// Notify what command is being executed then execute it.
process.stdout.write('Executing: ' + exec + '\n');
cp.execSync(exec, { stdio: 'inherit' });