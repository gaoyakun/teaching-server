var tsc = require('typescript');
var tsConfig = require('../src/tsconfig.json');

module.exports = {
  process(src, path) {
    if (path.endsWith('.ts')) {
      return tsc.transpile(
        src,
        tsConfig.compilerOptions,
        path,
        []
      );
    }
    return src;
  },
};