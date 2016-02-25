'use strict';

import { assert } from 'chai';
import cp         from 'child_process';
import fs         from 'fs-extra';

/**
 * Runs the following scripts:
 * `./scripts/build.js`
 * `./scripts/test.js`.
 * `./scripts/prepublish-test.js`.
 * `./scripts/prepublish-test-build.js`.
 *
 * Note that the low coverage results is good as prepublish-test and prepublish-test-build should not execute inside
 * the inPublish conditional block unless `npm publish` is being run.
 *
 * @test {onHandleCode}
 */
describe('Dummy Test', () =>
{
   /**
    * Test `./scripts/build.js`.
    */
   it('Dummy', () =>
   {
      assert(true);
      //
      //fs.emptyDirSync('./test-src/dist');
      //
      //cp.execSync('npm run build', { stdio: 'inherit' });
      //
      //assert(fs.statSync('./test-src/dist/TestDummy.js').isFile());
      //assert(fs.statSync('./test-src/dist/TestDummy.js.map').isFile());
      //
      //fs.emptyDirSync('./test-src/dist');
   });
});