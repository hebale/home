const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

dotenv.config();

module.exports = { 
  entry: './src/index.js',
  // devtool: 'eval',
  // devtool: 'hidden-source-map',
  resolve: {
    extensions: ['.js', '.ts', '.scss'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  output: {
    filename: './assets/js/script.min.js',
    path: path.join(__dirname, 'public'),
    assetModuleFilename: assetInfo => {
      let extType = assetInfo.module.resource.split('.').at(1);

      if(/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) extType = 'images';
      if(/ttf|otf|woff|woff2|eot/i.test(extType)) extType = 'fonts';

      switch (extType) {
        case 'css':
          return `assets/${extType}/style.min[ext]`;
        default:
          return `assets/${extType}/[name][ext]`;
      }
    },
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../'
            }
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name(resourcePath) {
                return resourcePath.replace(`${path.dirname(__filename)}/src`, '');
              },
            },
          },
        ],
      },
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
    ]
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    // open: true,
    historyApiFallback: true,
    // devMiddleware: {
    //   writeToDisk: true,
    // },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: './assets/css/style.min.css'
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/assets/json/', to: './assets/json/' },
      ],
    })
  ]
}