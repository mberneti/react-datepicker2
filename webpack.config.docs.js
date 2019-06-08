const path = require('path');

module.exports = {
  entry: './docs/src/boot.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    libraryTarget: 'umd',
    filename: 'demo_bundles.js',
    library: 'react-datepicker2'
  },
  module: {
    rules: [
      {
          test: /\.(jpg|png|svg)$/,
          loader: 'file-loader'
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]",
          },
        },
      },
      {
        test: /\.(js|jsx)$/,
        use: [{
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-transform-runtime'],
            presets: ['@babel/preset-env','@babel/preset-react']
          }
        }],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        use: 'file-loader',
        test: /\.(woff(2)?|ttf)(\?v=\d+\.\d+\.\d+)?$/,
      }, 
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      }]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
}