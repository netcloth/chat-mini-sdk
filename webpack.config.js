const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'nchsdk.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './demo'
  },
};