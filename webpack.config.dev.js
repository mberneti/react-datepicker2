const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './docs/demo.html',
  filename: 'index.html'
})

module.exports = {
  entry: './docs/src/boot.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    libraryTarget: 'umd',
    filename: 'demo_bundles.js',
    library: 'react-datepicker2'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/, query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0', 'react'],
        }
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
}