/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDevelopment = process.env.NODE_ENV === 'development';
const CopyPlugin = require('copy-webpack-plugin');
// const SassLintPlugin = require('sass-lint-webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');


console.log('************************************************');
console.log(`* NODE_ENV is ${process.env.NODE_ENV}`);
console.log('************************************************');

const ASSET_PATH = !isDevelopment ? '/Scripts/webpack/' : '';
// process.env.ASSET_PATH || '/';

module.exports = {
  context: __dirname,
  mode: 'production',
  entry: {
    app: './src/index.js',
    polyfills: './src/polyfills.js',
    global: './src/styles/global.scss',

    // This is just for demo purposes.  Things like this should be in the CMS.
    // images: './src/images/product-example.jpg'
  },
  cache: false, /* {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },*/
  // Source map generation: https://webpack.js.org/guides/development/#using-source-maps
  // 'cheap-module-eval-source-map'
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: './dist'
    },

    // inline: true,
    hot: true
  },
  plugins: [

    // This makes it possible for us to safely use env vars on our code
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Home Page',
      template: './src/index.html',
      filename: './index.html'
    }),
    // new SassLintPlugin(),
    new CopyPlugin({
      patterns: [
        { from: './src/icons/', to: './icons/' },
        { from: './src/images/', to: './images/' }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
    /* {
       enforce: 'pre',
       test: /\.(js|jsx)$/,
       exclude: /node_modules/,
       loader: 'eslint-loader',
       options: {
         emitError: true
       }
     },*/
    new ESLintPlugin({
      extensions: [`js`, `jsx`],
      /* exclude: [
        `/node_modules/`
      ], */
      emitError: true, // these are the options we'd previously passed in
    }),
    new WebpackManifestPlugin()
  ],
  output: {
    publicPath: ASSET_PATH,
    // For each entry, create a bundle
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].bundle.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // loader: 'babel-loader'
        use: [
          {
            loader: 'babel-loader',
            // from https://stackoverflow.com/questions/62703393/support-for-the-experimental-jsx-isnt-currently-enabled
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react', {
                  'plugins': [
                    ["@babel/plugin-proposal-class-properties", { "loose": true }]
                  ]
                }
              ]
            }
          }
        ]
      },
      /*
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },*/
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },

      {
        test: /\.(scss|css)$/,
        dependency: { not: ['url'] },
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          },
          {
            loader: 'css-loader',
            options: {
              import: true, // help resolve @import(~enable-a11y/...) urls.
              url: true,
              importLoaders: 2
            }
          },
          // Need to fix url() declarations (like in @font-face declarations)
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'compressed',
                includePaths: [path.resolve(__dirname, './src/styles')]
              }
            }
          }
        ],
        type: 'javascript/auto'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        dependency: { not: ['url'] },
        use: {
          loader: 'url-loader',
          options: {
            limit: 50000,
            mimetype: 'application/font-woff',
            name: './fonts/[name].[ext]'
            // publicPath: '../'
          }
        },
        type: 'javascript/auto'
      },
      /*
       * This is to deploy images so they can be included inside React JSX via an include.
       * We can refactor these to use the CopyPlugin urls above.
       */
      {
        test: /\.(png|svg|jpg|gif)$/,
        dependency: { not: ['url'] },
        loader: 'file-loader',
        options: {
          name() {
            return '[path][name].[ext]';
          },
          outputPath: (url, resourcePath, context) => {
            // `resourcePath` is original absolute path to asset
            // `context` is directory where stored asset (`rootContext`) or `context` option

            // To get relative path you can use
            const relativePath = path.relative(context, resourcePath);

            if (/my-custom-image\.png/.test(resourcePath)) {
              return `other_output_path/${url}`;
            }

            if (/images/.test(context)) {
              return `image_output_path/${url}`;
            }
            return `${relativePath}`;
          }
        },
        type: 'javascript/auto'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '*.html'],
    modules: [
      path.resolve('./src/js'),
      path.resolve('./node_modules')
    ],
    alias: {
      '~enable-a11y': path.resolve(__dirname, 'node_modules/enable-a11y'),
      '~glider-js': path.resolve(__dirname, 'node_modules/glider-js'),
      '../libs/accessibility-js-routines/dist/accessibility.module.js': path.resolve(__dirname, 'node_modules/accessibility-js-routines/dist/accessibility.module'),
      '../../libs/glider-js/glider.js': path.resolve(__dirname, 'node_modules/glider-js/glider')
    },
    // polyfill for fallbacks
    fallback: {
      'fs': false,
      'tls': false,
      'net': false,
      'path': false,
      'zlib': false,
      'http': false,
      'https': false,
      'stream': false,
      'crypto': false,
      'crypto-browserify': require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify,
      'buffer': false
    }
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};
