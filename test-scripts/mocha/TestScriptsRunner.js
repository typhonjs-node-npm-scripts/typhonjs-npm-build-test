'use strict';

var assert =   require('chai').assert;
var fs =       require('fs-extra');

fs.emptyDirSync('./coverage-test');

/**
 * Runs the following scripts:
 * `../../node_modules/typhonjs-npm-scripts-build-babel/scripts/build.js`
 * `../../node_modules/typhonjs-npm-scripts-test-mocha/scripts/test.js`
 * `../../node_modules/typhonjs-npm-scripts-test-mocha/scripts/test-coverage.js`
 * `../../node_modules/typhonjs-npm-scripts-publish/scripts/prepublish.js`
 *
 * @test {onHandleCode}
 */
describe('Script Test', function()
{
   /**
    * Test `../../node_modules/typhonjs-npm-scripts-build-babel/scripts/build.js`.
    */
   it('build', function()
   {
      fs.emptyDirSync('./test-src/dist');

      require('../../node_modules/typhonjs-npm-scripts-build-babel/scripts/build.js');

      assert(fs.statSync('./test-src/dist/TestDummy.js').isFile());
      assert(fs.statSync('./test-src/dist/TestDummy.js.map').isFile());

      var TestDummy = require('../../test-src/dist/TestDummy').default;

      var test = new TestDummy();

      assert ('Test Success' === test.test());

      fs.emptyDirSync('./test-src/dist');
   });

   /**
    * Test `../../node_modules/typhonjs-npm-scripts-test-mocha/scripts/test.js`.
    */
   it('test', function()
   {
      require('../../node_modules/typhonjs-npm-scripts-test-mocha/scripts/test.js');
   });

   /**
    * Test `../../node_modules/typhonjs-npm-scripts-test-mocha/scripts/test-coverage.js`.
    */
   it('test-coverage', function()
   {
      // Store current TRAVIS environment variable.
      var origTravis = process.env.TRAVIS;
      delete process.env.TRAVIS;

      fs.emptyDirSync('./coverage');

      // Instruments test-coverage script.
      require('../../node_modules/typhonjs-npm-scripts-test-mocha/scripts/test-coverage.js');

      // Verify that there are files / directories in `./coverage`.
      var files = fs.readdirSync('./coverage');
      assert(files.length > 0);

      fs.emptyDirSync('./coverage');

      // Restore Travis environment variable
      if (typeof origTravis !== 'undefined') { process.env.TRAVIS = origTravis; }
   });

   /**
    * Test `../../node_modules/typhonjs-npm-scripts-publish/scripts/prepublish.js`.
    *
    * To properly test this script `./test-scripts/prepublish/prepublishTest.js is invoked with the process.cwd changed
    * to `./test-scripts/prepublish` which will use the local `npm-pre-publish.json` file when the actual prepublish
    * script is required. It should be noted that `prepublishTest.js` sets the testing environment variable temporarily.
    */
   it('prepublish', function()
   {
      var cwd = process.cwd();

      // Changes working directory to the prepublish test directory which is where npm-pre-publish.json is picked up.
      process.chdir(cwd + '/test-scripts/prepublish');

      // Require prepublishTest which subsequently requires:
      // `./node_modules/typhonjs-npm-scripts-publish/scripts/prepublish.js
      require('../prepublish/prepublishTest.js');

      process.chdir(cwd);
   });
});