const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const JS_DIR = path.resolve(__dirname, './src');

const entry = {
  app: './src/app.js',
  product: './src/products.js',
  filter: './src/filter.js',
  sort: './src/sort.js',
  bundle: './src/bundle.js',
  suscription: './src/suscription.js',
  preview: './src/preview.js'
}

const output = {
  filename: '[name].js',
  path: path.resolve(__dirname, 'assets')
};

const rules = [
  {
    test: /\.js$/,
    include: [JS_DIR],
    exclude: /node_modules/,
    use: 'babel-loader'
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
  },
  {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset',
  }
];

module.exports = {

  entry: entry,

  output: output,

  module: {
    rules: rules,
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ]
  },

}