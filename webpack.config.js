const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const devPort = require('./config/dev.config').DEV_PORT;

module.exports = {
	devServer: {
		static: path.resolve(__dirname, 'public'),
		host: '127.0.0.1',
		port: devPort,
	},
	resolve: {
		extensions: ['.js', '.json', '.ts', '.tsx'],
		alias: {
			Components: path.join(__dirname, 'src/render/Components'),
			Hooks: path.join(__dirname, 'src/render/Hooks'),
			Utils: path.join(__dirname, 'src/render/Utils'),
		},
	},
	entry: path.resolve(__dirname, 'src/render/index.tsx'),
	output: {
		path: path.resolve(__dirname, 'build', 'render'),
		filename: 'index.[chunkhash:8].js',
	},
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								// 仅对.module结尾启用css模块化
								auto: (resourcePath) => /\.module\.(sa|sc|c)ss$/.test(resourcePath),
								localIdentName: '[local]_[hash:base64:8]',
							},
						},
					},
					'resolve-url-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.tsx?$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'ts-loader',
					},
				],
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1024, //对文件的大小做限制，1kb
						},
					},
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './public/index.html',
		}),
	],
};
