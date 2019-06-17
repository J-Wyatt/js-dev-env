import path from 'path';
import webpack from 'webpack';

export default {
  debug: true,
  devtool: 'source-map', // a little slower to build but recommended for production because it's high quality experience
  noInfo: false,
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),//popular convention and stands for distribution
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
		// Eliminate duplicate packages when generating bundle
		new webpack.optimize.DedupePlugin(),
		// Minify JS
		new webpack.optimize.UglifyJsPlugin()
	],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  }
}
