require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './client/javascripts/app.js',
  mode: process.env.MODE,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/dist')

    // path: path.resolve(__dirname, 'build'),
    // filename: 'app.js'
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env': {
            'LOCAL_NODE': JSON.stringify(process.env.LOCAL_NODE),
            'MODE':JSON.stringify(process.env.MODE),
        }
    })
    ,
    new CopyPlugin({
      patterns: [
        { from: './client/index.html', to: 'index.html' },
        { from: 'client/homepage1.html', to: 'homepage1.html' },
        { from: 'client/homepage2.html', to: 'homepage2.html' },
        { from: 'client/homepage3.html', to: 'homepage3.html' },
  //   { from: 'client/stylesheets/bootstrap.css', to: 'bootstrap.css' },
  //   { from: 'client/stylesheets/font-awesome.css', to: 'font-awesome.css' },
  //   { from: 'client/stylesheets/popuo-box.css', to: 'popuo-box.css' },
  //   { from: 'client/stylesheets/lightbox.css', to: 'lightbox.css' },
  //   { from: 'client/stylesheets/flexslider.css', to: 'flexslider.css' },
  //   { from: 'client/stylesheets/style.css', to: 'style.css' },
  
  // { from: './client/javascripts/jquery-2.1.4.min.js', to: 'js/jquery-2.1.4.min.js' },
  // { from: './client/javascripts/bootstrap.js', to: 'js/bootstrap.js' },
  // { from: './client/javascripts/lightbox-plus-jquery.min.js', to: 'js/lightbox-plus-jquery.min.js' },
  // { from: './client/javascripts/numscroller-1.0.js', to: 'js/numscroller-1.0.js' },
  // { from: './client/fonts/fontawesome-webfont.woff2', to: 'fonts/fontawesome-webfont.woff2' },
  // { from: './client/fonts/fontawesome-webfont.woff', to: 'fonts/fontawesome-webfont.woff' },
  // { from: './client/fonts/fontawesome-webfont.ttf', to: 'fonts/fontawesome-webfont.ttf' },
  // { from: './client/images/2.jpg', to: 'images/2.jpg' },
  // { from: './client/images/logo.jpg', to: 'images/logo.jpg' },
  // { from: './client/images/logo2.png', to: 'images/logo2.png' } 
      ]
    })
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
    ],
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
          loader: 'babel-loader'
      }
  },
  {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
  }
]
    // rules: [
    // // { test: /\.json$/, use: 'json-loader' },
    //     {
    //     test: /\.js$/,
    //     exclude: /(node_modules|bower_components)/,
    //     loader: 'babel-loader',
        
    //     query: {
    //       presets: ['@babel/preset-env'],
    //       plugins: ['@babel/plugin-transform-runtime']
    //     }
    //   }
    // ]
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  externals:[{
    xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
}]
};


