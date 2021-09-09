const { src, dest, series } = require('gulp');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const pkg = require('./package.json')
const jsonFormat = require('json-format');
const fs = require('fs');

const cpList = [
	{
		name: '.gitignore',
		rename: 'gitignore'
	},
	{
		name: '.env',
	},
	{
		name: '.env.staging',
	},
	{
		name: '.env.production',
	},
	{
		name: '.editorconfig',
	},
	{
		name: 'craco.config.js',
	},
	{
		name: 'craco.config.js',
	},
	{
		name: 'eslint.config.js',
	},
	{
		name: 'jestconfig.json',
	},
	{
		name: 'LICENSE',
	},
	{
		name: 'paths.json',
	},
	{
		name: 'paths.json',
	},
	{
		name: 'README.md',
	},
	{
		name: 'tsconfig.json',
	},
	{
		name: 'src',
	},
	{
		name: 'public',
	},
	{
		name: 'docs',
	},
]

function generateTempateFile(cb) {
	const file = {}
	// 过滤掉gulp
	Object.keys(pkg.devDependencies).forEach(item => {
		if (/^gulp/.test(item)) {
			delete pkg.devDependencies[item]
		}
	})
	file.package = {
		scripts: {
			"start": "craco start",
      "build": "craco build",
      "test": "craco test"
		},
		config: pkg.config,
		dependencies: pkg.dependencies,
		devDependencies: pkg.devDependencies
	}
	fs.writeFileSync('dist/template.json', jsonFormat(file))
	cb()
}

function copyfile(cb) {
	const pro = new Promise((resolve, reject) => {
		cpList.forEach(item => {
			src(item.name)
			.pipe(gulpif(!!item.rename, rename(item.rename)))
			.pipe(dest('dist/template'))
		})
		resolve()
	})
	pro.then(() => {
		cb()
	})
}
exports.default = series(copyfile, generateTempateFile)