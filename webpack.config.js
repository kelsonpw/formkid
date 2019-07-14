const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',

  entry: {
    content: './src/content.js',
    background: './src/background.js',
    popup: './src/popup/index.jsx',
  },

  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: '[name].js',
    publicPath: './public/',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  plugins: [new CopyPlugin([{ from: './public', to: '../' }])],
};
