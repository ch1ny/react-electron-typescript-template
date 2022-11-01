const path = require('path');
const chalk = require('chalk');
const fse = require('fs-extra');
const { DIRNAME } = require('./common');
const { APP_ICON } = require('../config/dev.config');
const { updateDarwin } = require('./update/darwin');

const dist = async () => {
	console.log(chalk.bold.blueBright('1. 清空build目录'));
	fse.emptyDirSync(path.resolve(DIRNAME, 'build'));

	console.log(chalk.bold.blueBright('2. 读取package.json数据'));
	const packageJson = fse.readJsonSync(path.resolve(DIRNAME, 'package.json'));
	const {
		name: packageName = '',
		version: packageVersion = '1.0.0',
		author: packageAuthor = '',
		license: packageLicense = 'MIT',
		description: packageDescription = '',
	} = packageJson;

	console.log(chalk.bold.blueBright('3. 编译ts代码'));
	const { execa } = await import('execa');
	await Promise.all([
		execa('npm', ['run', 'build:render']),
		execa('npm', ['run', 'build:preload']),
		execa('npm', ['run', 'build:main']),
	]);
	console.log(chalk.bold.greenBright('编译结束'));

	console.log(chalk.bold.blueBright('4. 生成package.json'));
	fse.outputJsonSync(
		path.resolve(DIRNAME, 'build', 'package.json'),
		{
			name: `${packageName}`,
			version: `${packageVersion}`,
			author: `${packageAuthor}`,
			license: `${packageLicense}`,
			description: `${packageDescription}`,
			main: 'main/index.js',
		},
		{
			spaces: '\t',
			EOL: '\n',
		}
	);
	fse.copyFileSync(APP_ICON, path.resolve(DIRNAME, 'build', `app_icon${path.extname(APP_ICON)}`));

	console.log(chalk.bold.blueBright('5. 设置electron-packager打包参数'));
	const inquirer = (await import('inquirer')).default;
	const platform = process.platform;
	const { arch, overwrite } = await inquirer.prompt([
		{
			name: 'arch',
			message: '请选择目标架构',
			type: 'list',
			choices: ['x64', 'x86'],
		},
		{
			name: 'overwrite',
			message: '是否覆盖',
			type: 'list',
			choices: ['Y', 'N'],
		},
	]);
	const appName = packageName
		.split('/')
		.reverse()[0]
		.split('-')
		.map((str) => `${str.substring(0, 1).toUpperCase()}${str.substring(1)}`)
		.join('');
	const electronPackagerOptions = [
		path.resolve(DIRNAME, 'build'),
		appName,
		`--icon=${APP_ICON}`,
		`--platform=${platform}`,
		`--arch=${arch}`,
		`--out`,
		`${path.resolve(DIRNAME, 'dist/')}`,
		`--asar`,
		overwrite === 'Y' ? '--overwrite' : '',
	];

	if (platform === 'win32') {
		const { needAdmin } = await inquirer.prompt([
			{
				name: 'needAdmin',
				message: '是否需要管理员权限',
				type: 'list',
				choices: ['N', 'Y'],
			},
		]);
		if (needAdmin === 'Y')
			electronPackagerOptions.push(
				'--win32metadata.requested-execution-level=requireAdministrator'
			);
	}

	console.log(chalk.bold.blueBright('6. electron-packager打包可执行文件'));
	await execa('electron-packager', electronPackagerOptions, {
		stdout: process.stdout,
	});

	console.log(chalk.bold.blueBright('7. 复制更新器'));
	const updater = platform === 'win32' ? 'updater.exe' : 'updater';
	await fse.copyFile(
		path.resolve(DIRNAME, 'updaters', platform, updater),
		path.resolve(DIRNAME, 'dist', `${appName}-${platform}-${arch}/${appName}.app`, updater)
	);

	console.log(chalk.bold.blueBright('8. 生成更新文件'));
	switch (platform) {
		case 'darwin':
			await updateDarwin(appName, arch)
			break;
		default:
			// no-op;
	}
};

dist();
