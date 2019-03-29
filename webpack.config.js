/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = env => {
  const IS_DEV = env.mode === 'dev';
  const TYPE = env.type;
  let ASSETS
  const assetList = {
    'js': {
      'js-app': './source/js/App.js',
    },

    'css': {
      'css-app': './source/scss/App.scss'
    },

  };

  if (Object.keys(assetList).includes(TYPE)) {
    ASSETS = assetList[TYPE]
  } else {
    ASSETS = Object.assign({}, ...Object.values(assetList))
  }

  return {
    entry: ASSETS,

    performance: {
      hints: false
    },

    output: {
      path: path.join(__dirname, 'dist/'),
      pathinfo: false,
    },

    devtool: IS_DEV ? 'eval' : false,

    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
            presets: [
              ['es2015'],
              ['env', {
                targets: {
                  browsers: ['last 2 versions', 'safari >= 7'],
                },
              }],
            ],
          },
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                importLoader: 2,
                minimize: !IS_DEV
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf)$/,
          use: 'url-loader?limit=10000',
        },
        {
          test: /\.(svg|png|jpg)$/,
          use: 'file-loader',
        },

        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }
      ],
    },

    optimization: {
      usedExports: true,
      sideEffects: true,
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_console: !IS_DEV,
            }
          }
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessor: require('cssnano'),
          sourcemap: IS_DEV,
          cssProcessorOptions: {
            map: {
              inline: IS_DEV
            }
          },

          cssProcessorPluginOptions: {
            preset: ['default', {
              autoprefixer: {
                enable: true
              },
              safe: true,
              discardComments: {
                removeAll: IS_DEV
              }
            }],
          },
          canPrint: false
        })
      ]
    },

    plugins: [
      new ProgressBarPlugin(),
      new MiniCssExtractPlugin({
        chunkFilename: '[name].css',
        sourceMap: true,
      }),
    ],
  }
};
