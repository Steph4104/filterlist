const path = require('path');

const context = path.join(__dirname, 'src');

module.exports = {
  mode: 'development',
  context,
  entry: './index.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /(\.js)/,
      exclude: /(node_modules|dist)/,
      use: [{
        loader: 'babel-loader',
      }],
    },
    {
      test: /\.scss$/,
      use: [
        {
          loader: "style-loader" // creates style nodes from JS strings
        },
        {
          loader: "css-loader" // translates CSS into CommonJS
        },
        {
          loader: "sass-loader" // compiles Sass to CSS
        }
      ]
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/, loader: 'url-loader?limit=100000'}],
    
  },
  resolve: {
    modules: [
      'src',
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    host: '192.168.0.128',
    port:'8080',
    compress: true,
}
};

