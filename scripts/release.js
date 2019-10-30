const fs = require('fs-extra');

try {
  fs.copy('src/styles', 'dist/styles');
  console.log('Copied additional files');
} catch (e) {
  console.error(`Failed to copy additional files due to: ${e}`);
}
