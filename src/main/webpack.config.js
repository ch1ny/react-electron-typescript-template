const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DIRNAME } = require('../../scripts/common');

module.exports = {
	resolve: {
		extensions: ['.js', '.json', '.ts'],
	},
	entry: path.resolve(__dirname, 'index.ts'),
	target: 'electron-main',
	output: {
		path: path.resolve(DIRNAME, 'build', 'main'),
		filename: 'index.js',
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
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
	],
};
