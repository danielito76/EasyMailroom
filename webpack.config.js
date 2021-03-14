// const path = require('path')
// const webpack = require('webpack')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
//
// module.exports = {
//   entry: './src/main.js',
//   output: {
//     path: path.resolve('dist'),
//     filename: 'bundle.js'
//   },
//   devtool: 'source-maps',
//   module: {
//     rules: [
//       { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
//       { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
//       { test: /\.s(a|c)ss$/, loader: ['style-loader', 'css-loader', 'sass-loader'] }
//     ]
//   },
//   devServer: {
//     contentBase: 'src',
//     hot: true,
//     open: true,
//     port: 8000,
//     watchContentBase: true
//   },
//   plugins: [
//     new webpack.HotModuleReplacementPlugin(),
//     new HtmlWebpackPlugin({
//       template: 'src/index.html',
//       filename: 'index.html',
//       inject: 'body'
//     })
//   ]
// }

//============================================================================
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: 'main.js',
  output: {
    filename: 'bundle.js'
  },
  devtool: 'source-maps',
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
      { test: /\.s(a|c)ss$/, loader: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  },
  devServer: {
    contentBase: 'src',
    hot: true,
    open: true,
    port: 8000,
    watchContentBase: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ]
}
