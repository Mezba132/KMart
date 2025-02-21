const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
require('regenerator-runtime/runtime')

module.exports = {
	mode : 'development',
	entry : ["regenerator-runtime/runtime.js", './src/index.js'] ,
	devServer: {
		port: 3000,
		devMiddleware: {
			index: true,
			mimeTypes: { 'text/html': ['phtml'] },
			publicPath: 'auto',
			serverSideRender: true,
			writeToDisk: true,
		},
		historyApiFallback: true,
		compress: true,
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test : /\.css$/,
				use : [
					MiniCssExtractPlugin.loader,
						'css-loader'
				]
			}
			// {
			//     test : /\.scss$/,
			//     use : ['sass-loader']
			// }
		]
	},
	plugins: [
			new MiniCssExtractPlugin(),
			new Dotenv(),
		    new CleanWebpackPlugin({
			    cleanOnceBeforeBuildPatterns: [`${path.resolve(__dirname, 'public')}/*.hot-update.*`],
			    dry: false,
			    dangerouslyAllowCleanPatternsOutsideProject: true
		    })
	]
}