'use strict';

import { assert } from 'chai';
import cp         from 'child_process';
import fs         from 'fs-extra';

/**
 * Runs the following script:
 * `npm run build`
 *
 * @test {onHandleCode}
 */
describe('Test ES6 Mocha', () =>
{
   /**
    * Test `npm run build`.
    */
   it('Test ES6 Build', () =>
   {
      fs.emptyDirSync('./test-src/dist');

      cp.execSync('npm run build', { stdio: 'inherit' });

      assert(fs.statSync('./test-src/dist/TestDummy.js').isFile());
      assert(fs.statSync('./test-src/dist/TestDummy.js.map').isFile());

      fs.emptyDirSync('./test-src/dist');
   });
});