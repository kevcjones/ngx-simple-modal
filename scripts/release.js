const del = require('del');
const fs = require('fs-extra');
const package = require('../package.json');

delete package.scripts;
delete package.devDependencies;

package.main = patchPath(package.main);
package.module = patchPath(package.module);
package.typings = patchPath(package.typings);

try {
  fs.writeJsonSync('dist/package.json', package, { spaces: '   ' });
  console.log('package.json was written');
} catch (e) {
  console.error(`Failed to write package.json file due to: ${e}`);
}

try {
  fs.copy('README.md', 'dist/README.md');
  fs.copy('LICENSE.md', 'dist/LICENSE.md');
  fs.copy('src/styles', 'dist/styles');
  console.log('Copied additional files');
} catch (e) {
  console.error(`Failed to copy additional files due to: ${e}`);
}

del('dist/tests', { force: true })
  .then(paths => {
    console.log('deleted tests folder..');
  })
  .catch(e => {
    console.error(`Failed to delete test folder from final package due to: ${e}`);
  });

function patchPath(path) {
  return path.replace('dist/', '');
}
