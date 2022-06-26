const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  watch:true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new NodePolyfillPlugin()
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], 
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};