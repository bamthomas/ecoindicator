var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'ecoindicator.js',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
