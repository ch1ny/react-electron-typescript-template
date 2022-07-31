import chalk from 'chalk';
import cp from 'child_process';
import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';
import { constants } from './constants.mjs';

/**
 * 创建项目文件夹
 * @returns {string} destDir 目标路径
 */
const create = async () => {
	console.log(chalk.bold.blueBright('1. 开始创建项目'));
	const { projectName, projectVersion, projectDescription, projectAuthor, projectLicense } =
		await inquirer.prompt([
			{
				type: 'input',
				name: 'projectName',
				message: '项目名称',
				validate: function (input) {
					const done = this.async();
					if (!input) {
						done('请输入项目名');
						return;
					}
					if (/[\\:*?"<>|]/.test(input)) {
						done('请输入合法文件名');
						return;
					}
					done(null, true);
				},
			},
			{
				type: 'input',
				name: 'projectVersion',
				message: '项目版本',
				default: '0.1.0',
			},
			{
				type: 'input',
				name: 'projectDescription',
				message: '项目描述',
			},
			{
				type: 'input',
				name: 'projectAuthor',
				message: '项目作者',
				default: `${constants.gitName}`,
			},
			{
				type: 'input',
				name: 'projectLicense',
				message: '项目证书',
				default: 'MIT',
			},
		]);

	// 目标根路径，process.cwd()为脚手架工作时的路径，将其与用户输入的项目名称拼接起来作为目标路径
	const destDir = path.join(process.cwd(), projectName);

	// 判断当前文件夹下是否有目标路径的目录
	if (fs.existsSync(destDir)) {
		throw Error(`Folder named '${projectName}' has already been existed`);
	}
	// 创建文件夹
	await fs.promises.mkdir(destDir, { recursive: true });
	// 初始化 package.json
	await fs.promises.writeFile(
		path.join(destDir, 'package.json'),
		`{
    "name": "${projectName}",
    "version": "${projectVersion}",
    "author": "${projectAuthor}",
    "license": "${projectLicense}"
}`
	);

	return destDir;
};

/**
 * @title 添加模板依赖
 * @param {string} destDir 目标路径（项目文件夹根目录）
 */
const depend = async (destDir) => {
	console.log(chalk.bold.blueBright('2. 初始化依赖'));
	const versionStr = cp.execSync('yarn -v', { encoding: 'utf-8' }).trim();
	const dependenciesStr = constants.Dependencies.dependencies
		.map((packageInfo) => `${packageInfo.package}@${packageInfo.version}`)
		.join(' ');
	const devDependenciesStr = constants.Dependencies.devDependencies
		.map((packageInfo) => `${packageInfo.package}@${packageInfo.version}`)
		.join(' ');
	if (/^\d+(\.\d+){1,2}$/.test(versionStr)) {
		// 存在 yarn 使用 yarn
		cp.execSync(`yarn add ${dependenciesStr}`, { encoding: 'utf8', cwd: destDir });
		cp.execSync(`yarn add -D ${devDependenciesStr}`, { encoding: 'utf8', cwd: destDir });
	} else {
		// 兜底使用 npm
		cp.execSync(`npm install --save ${dependenciesStr}`, { encoding: 'utf8', cwd: destDir });
		cp.execSync(`npm install --save-dev ${devDependenciesStr}`, {
			encoding: 'utf8',
			cwd: destDir,
		});
	}
};

const ret = async () => {
	const destDir = await create();

	await depend(destDir);
};

ret();
