/**
 * A basic script which outputs a JSON file to `./test/fixture`.
 */

var fs = require('fs-extra');

fs.writeJsonSync('./fixture/test.json', { success: true });