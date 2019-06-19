import path from 'path';
import webpack from 'webpack';
import htmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map', // a little slower to build but recommended for production because it's high quality experience
  noInfo: false,
  entry: {
		vendor: path.resolve(__dirname, 'src/vendor'),
		main: path.resolve(__dirname, 'src/index'),

	},
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),//popular convention and stands for distribution
    publicPath: '/',
		filename: '[name].[chunkhash].js'	//need a placeholder instead of the hardcoded bundle.js
													//this tells webpack to use the name we defined in the entry point
													//it will now generate a main.js and a vendor.js
													//it will automatically write references to both files in the html file
  },
  plugins: [
		// Generate an external css file with a hash in the filename
		new ExtractTextPlugin('[name].[contenthash].css'),
		// Hash the files using MD5 so that their names change when the content changes
		new WebpackMd5Hash(),
		// Use CommonsChunkPlugin to create a separate bundle
		// of vendor libraries so that they're cached separately.
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		//Create HTML file that includes reference to bundled JS
		new htmlWebpackPlugin({
			template: 'src/index.html',
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
				// Properties you define here are available in index.html
				// using htmkWebpackPlugin.option.varName
				trackJSToken: 'the token theyd give me if I signed up'
			}
		}),
		// Eliminate duplicate packages when generating bundle
		new webpack.optimize.DedupePlugin(),
		// Minify JS
		new webpack.optimize.UglifyJsPlugin()
	],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}
