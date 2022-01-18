/*
 * SupressFilesPlugin: used to supress JS async code.
 */
export default class SuppressFilesPlugin {
  constructor(options) {
    this.options = options;
  }

  apply = (compiler) => {
    compiler.plugin('emit', (compilation, callback) => {
      compilation.chunks.forEach(chunk => {
        chunk.files.filter(file => {
          const regexp = new RegExp(this.options.match);
          return regexp.test(file);
        }).forEach(file => {
          return delete compilation.assets[file];
        });
      });
      callback();
    });
  }
}
