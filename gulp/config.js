var dest = './www';
var src = './src';
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var fs = require('fs');

module.exports = {
  dest: dest,

  js: {
    src: src + '/js/**',
    dest: dest + '/js',
    uglify: false
  },

  webpack: {
    entry: src + '/js/app.js',
    output: {
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['', '.js']
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel'
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
        },
        {
          test: /\.png$/,
          loader: 'url-loader?limit=100000'
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('../assets/css/style.css', { allChunks: true }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(JSON.parse(fs.readFileSync('./gulp/.env.json')).env),
        'process.env.AITalk': JSON.stringify(JSON.parse(fs.readFileSync('./gulp/.secret.json')))
      }),
      new webpack.ProvidePlugin({
        'React': 'react',
        'ReactDOM': 'react-dom',
        'CSSModules': 'react-css-modules',
        'axios': 'axios',
      }),
    ]
  }
}
