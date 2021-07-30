const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const buildDirectory = 'dist';

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  output: {
    path: resolve(__dirname, buildDirectory),
  },
  devServer: {
    contentBase: resolve(__dirname, buildDirectory),
    compress: true,
    host: 'localhost',
    port: 8080,
    open: true,
    watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: 'babel-loader',
        exclude: '/node_modules',
      },
      {
        test: /\.(c|sc|sa)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|svg|gif|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext]',
        },
      },
      {
        test: /\.(eot|ttf|woff2?)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
