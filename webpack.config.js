const path = require('path');

var webpack = require('webpack');
var glob = require('glob');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var config = {
  entry: {
    build: './src/frontend/js/main.js',
    vendors: ['jquery']
  },

  resolve: {
    //WP2 no empties.
    extensions: ['.js', '.jsx'],
    //WP2    modulesDirectories: ['node_modules'].concat(glob.sync('./src/frontend/**/*'))
    modules: [
            path.resolve(__dirname, 'node_modules'),
         './src/frontend/**/*'
  ]},
  plugins: [
    // WP2 - Clean out ./public between builds.
   new CleanWebpackPlugin(['./public']),

    // WP2 Depreciated - needs one argument.
    new webpack.optimize.CommonsChunkPlugin( {name: 'vendors', filename: 'vendors.js', minChunks: Infinity} ),
   
    new webpack.LoaderOptionsPlugin({
      options: {
         eslint: {
             configFile: './.eslintrc'
           }
      }
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jquery': 'jquery'
    }),
    // WP2 replaced 'NoErrorsPlugin'.
    new webpack.NoEmitOnErrorsPlugin()
  ],
output: {
   filename: '[name].bundle.js',
   path: path.resolve(__dirname, './public')
  },
  //WP2 output: {
  //WP2   path: './public',
  //WP2   filename: '[name].js'
  //WP2 },

  module: {
    rules: [
      {test: /\.js[x]?$/,
        exclude: /node_modules/,
        //WP2 be specific.
        loader: 'react-hot-loader'
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        // WP2 be specific. 
        loader: 'babel-loader?presets[]=react,presets[]=es2015'
      },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.html$/, loader: 'file?name=[name].[ext]' },
      //WP2 no more preLoaders: [
      {
        enforce: 'pre',
        test: /\.js[x]?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },

  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    proxy: { '*': 'http://localhost:3000' }
  },

};

module.exports = config;


