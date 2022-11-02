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
    filename: (pathData) => {
      return pathData.chunk.name === 'main' ? 'index.js' : '[name].[chunkhash:8].js';
    },
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
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    splitChunks: {
      chunks: 'all',
	  name(module) {
		const moduleFileName = module
		  .identifier()
		  .split('/')
		  .reduceRight((item) => item)
		  .replace(/(.*?)(\.js)$/, '$1')
		return `vendor-${moduleFileName}`;
	  },
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
