const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');

module.exports = merge(
      {},
      {
            mode: 'production',
            entry: {
                  'joi-password': ['./lib/index.js'],
            },
            output: {
                  path: __dirname + '/cdn',
                  filename: '[name].min.js',
                  libraryTarget: 'umd',
            },
            target: 'web',
            externals: [nodeExternals()],
            module: {
                  rules: [
                        {
                              test: /\.js$/,
                              exclude: /(node_modules|bower_components)/,
                              use: [
                                    {
                                          loader: 'babel-loader',
                                    },
                              ],
                        },
                        {
                              test: /\.ts$/,
                              exclude: /(node_modules|bower_components)/,
                              use: [
                                    {
                                          loader: 'ts-loader',
                                          options: {
                                                compilerOptions: {
                                                      declaration: false,
                                                      target: 'es5',
                                                      module: 'commonjs',
                                                },
                                                transpileOnly: true,
                                          },
                                    },
                              ],
                        },
                  ],
            },
            externals: {
                  joi: 'joi',
            },
      },
);
