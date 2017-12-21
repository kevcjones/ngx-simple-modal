const fs = require('fs');
const rimraf = require('rimraf');
const copyfiles = require('copyfiles');
const package = require('../package.json');

delete package.scripts;
delete package.devDependencies;

package.main = patchPath(package.main);
package.module = patchPath(package.module);
package.typings = patchPath(package.typings);

try {
  fs.writeFileSync('dist/package.json', JSON.stringify(package, null, '  '));
  console.log('package.json was written');
} catch (e) {
  console.error(`Failed to write package.json file due to: ${e}`);
}

try {
  copyfiles([
    'README.md',
    'LICENSE.md',
    'dist' // Destination path
  ], {}, () => null);
  console.log('Copied additional files');
} catch (e) {
  console.error(`Failed to copy additional files due to: ${e}`);
}

try {
  rimraf('dist/test',() => { console.log('deleted test folder..'); });
} catch (e) {
  console.error(`Failed to delete test folder from final package due to: ${e}`);
}

function patchPath(path) {
  return path.replace('dist/', '');
}
