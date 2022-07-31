import cp from 'child_process';

export const constants = {
	get gitName() {
		return cp.execSync('git config --global user.name', { encoding: 'utf8' }).trim();
	},
	Dependencies: {
		dependencies: [
			{
				package: 'classnames',
				version: '^2.3.1',
			},
			{
				package: 'react',
				version: '^18.2.0',
			},
			{
				package: 'react-dom',
				version: '^18.2.0',
			},
		],
		devDependencies: [
			{
				package: '@types/react',
				version: '^18.0.15',
			},
			{
				package: '@types/react-dom',
				version: '^18.0.6',
			},
			{
				package: 'chalk',
				version: '^4.1.2',
			},
			{
				package: 'clean-webpack-plugin',
				version: '^4.0.0',
			},
			{
				package: 'css-loader',
				version: '^6.7.1',
			},
			{
				package: 'electron',
				version: '^19.0.10',
			},
			{
				package: 'electron-packager',
				version: '^15.5.1',
			},
			{
				package: 'execa',
				version: '^6.1.0',
			},
			{
				package: 'file-loader',
				version: '^6.2.0',
			},
			{
				package: 'file-loader',
				version: '^6.2.0',
			},
			{
				package: 'fs-extra',
				version: '^10.1.0',
			},
			{
				package: 'html-webpack-plugin',
				version: '^5.5.0',
			},
			{
				package: 'inquirer',
				version: '^9.0.2',
			},
			{
				package: 'resolve-url-loader',
				version: '^5.0.0',
			},
			{
				package: 'sass',
				version: '^1.54.0',
			},
			{
				package: 'sass-loader',
				version: '^13.0.2',
			},
			{
				package: 'style-loader',
				version: '^3.3.1',
			},
			{
				package: 'ts-loader',
				version: '^9.3.1',
			},
			{
				package: 'typescript',
				version: '^4.7.4',
			},
			{
				package: 'url-loader',
				version: '^4.1.1',
			},
			{
				package: 'webpack',
				version: '^5.74.0',
			},
			{
				package: 'webpack-cli',
				version: '^4.10.0',
			},
			{
				package: 'webpack-dev-server',
				version: '^4.9.3',
			},
		],
	},
};
