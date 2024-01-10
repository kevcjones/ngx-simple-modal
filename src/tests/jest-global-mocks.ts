const mock = () => {
  let storage = {};
  return {
    getItem: key => key in storage ? storage[key] : null,
    setItem: (key, value) => storage[key] = value || '',
    removeItem: key => delete storage[key],
    clear: () => storage = {},
  };
};

Object.defineProperty(window, 'localStorage', {value: mock()});
Object.defineProperty(window, 'sessionStorage', {value: mock()});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ['-webkit-appearance']
});


const fs = require('fs');
const path = require('path');

global.requireContext = (base = '.', scanSubDirectories = false, regularExpression = /\.js$/) => {
  // @ts-ignore
  if (typeof require.context !== 'undefined') {
    // @ts-ignore
    return require.context(base, scanSubDirectories, regularExpression);
  }

  const files = {};

  function readDirectory(directory) {
    fs.readdirSync(directory).forEach((file) => {
      const fullPath = path.resolve(directory, file);

      if (fs.statSync(fullPath).isDirectory()) {
        if (scanSubDirectories) readDirectory(fullPath);

        return;
      }

      if (!regularExpression.test(fullPath)) return;

      files[fullPath] = true;
    });
  }

  readDirectory(path.resolve(__dirname, base));

  function Module(file) {
    return require(file);
  }

  // @ts-ignore
  Module.keys = () => Object.keys(files);

  return Module;
};
