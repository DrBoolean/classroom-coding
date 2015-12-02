var webpack = require('webpack');
var glob = require('glob');

var config = {
  entry: {
    build: './src/frontend/js/main.js',
    vendors: ['jquery']
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules'].concat(glob.sync('./src/frontend/**/*'))
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js', Infinity),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jquery': 'jquery'
    }),

    new webpack.NoErrorsPlugin()
  ],

  output: {
    path: './public',
    filename: '[name].js'
  },

  module: {
    noParse: [],
    loaders: [
      {test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'react-hot'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=react,presets[]=es2015'
      },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.html$/, loader: 'file?name=[name].[ext]' }
    ],

    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ]
  },

  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    proxy: { '*': 'http://localhost:3000' }
  },

  eslint: {
    configFile: './.eslintrc'
  }
};

module.exports = config;

