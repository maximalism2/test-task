var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: 'eval',
  entry: {
    app: ['webpack-dev-server/client?http://localhost:8000',
    'webpack/hot/only-dev-server',
    './src/app/index'],
  },
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: '[name].js',
    publicPath: '/js/'
  },
  resolve: {
    extensions: ['', '.jsx', '.js', '.json'],
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules')
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('development'),
      LANG: JSON.stringify('en')
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/)
  ],
  module: {
    loaders: [{
      test: /(\.js|\.jsx)$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    }]
  }
};
