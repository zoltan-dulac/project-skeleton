import path from 'path';

export default {
  alias: {
    // directories must start with '/' to resolve correctly
    components: __dirname + '/../../src/js/components',
    constants: __dirname + '/../../src/js/constants',
    images: __dirname + '/../../dev-server/assets/images',
    layouts: __dirname + '/../../src/layouts',
    styles: __dirname + '/../../src/styles',
    test: __dirname + '/../../build/test',
    utils: __dirname + '/../../src/js/utils',
    views: __dirname + '/../../src/views'
  },

  extensions: ['.js', 'jsx', '.scss', '.json'],

  modules: [
    path.join(__dirname, 'src'),
    'node_modules'
  ]
};
