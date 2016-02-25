/**
 * Performs a basic test setting `process.env.NPM_IN_PUBLISH_TEST` to true so that the prepublish script will execute
 * the scripts in `./npm-pre-publish.json` which writes a file to `./fixture`. If that file exists the test
 * succeeds.
 */

var fs = require('fs-extra');

// Set variable that allows prepublish.js to execute fully in testing mode.
process.env.NPM_IN_PUBLISH_TEST = true;

// Notify what command is being executed then execute it.
process.stdout.write('Executing typhonjs-npm-scripts-publish test.' + '\n');

fs.emptyDirSync('./fixture');

// Run prepublish script in test mode.
require('../../node_modules/typhonjs-npm-scripts-publish/scripts/prepublish');

try
{
   // Verify that `./fixture/test.json` exists.
   if (!fs.statSync('./fixture/test.json').isFile())
   {
      throw new Error("could not open './fixture/test.json'.");
   }
}
catch (err)
{
   throw new Error('Prepublish Test failed: ' + err);
}

fs.emptyDirSync('./fixture');

// For safety reset test testing variable that allows prepublish.js to execute fully in testing mode.
process.env.NPM_IN_PUBLISH_TEST = false;