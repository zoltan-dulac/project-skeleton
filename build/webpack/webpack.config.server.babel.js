/* eslint-disable camelcase */

import path from 'path';
import webpack from 'webpack';
import SuppressFilesPlugin from './suppress-files-webpack-plugin';
import resolve from './webpack.config.resolve';

const {
  NODE_ENV
} = process.env;

const webpackConfig = {
  output: {
    path: path.join(__dirname, '../../dist/server/'),
    chunkFilename: 'react/async/[name].js',
    publicPath: '/etc.clientlibs/settings/wcm/designs/fca-brands/clientlibs/',
    libraryTarget: 'umd',
    // will name the AMD module of the UMD build
    umdNamedDefine: true,
    filename: 'server.js',
    pathinfo: true
  },
  target: 'node',

  entry: {
    server: path.resolve('src', 'server.js')
  },

  devtool: '',

  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },

  module: {
    rules: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, '../../src/')
      ],
      use: ['babel-loader']
    }, {
      test: /\.scss$/,
      use: ['ignore-loader']
    }, {
      test: /\.css$/,
      use: ['ignore-loader']
    }, {
      test: /\.(png|jpg)$/,
      use: ['ignore-loader']
    }, {
      test: /.(woff|woff2|eot)$/,
      use: ['ignore-loader']
    }, {
      test: /\.svg/,
      use: ['ignore-loader']
    }, {
      test: /\.svg$/,
      use: ['ignore-loader']
    },
    {
      test: /\.hbs/,
      use: ['ignore-loader']
    }]
  },

  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: false
    }),
    new webpack.NormalModuleReplacementPlugin(/(.*)loaders(\.*)/, function(resource) {
      resource.request = resource.request.replace(/loaders/, 'noloaders');
    }),
    new SuppressFilesPlugin({
      match: /[\/\\]async[\/\\]\S+\.js$/
    })
  ],

  resolve,

  stats: {
    children: false,
    reasons: false
  },
  optimization: {
    minimize: false
  }
};

export default webpackConfig;
