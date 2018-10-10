import fs from 'fs-extra';
import webpackFolder from './webpack-config/path';

const args = process.argv.filter(arg => arg.split(0,7) === 'target=');
let distPath = './dist';
if (args.length > 0)  [,distPath] = args[args.length - 1].split('=');
fs.removeSync(distPath);
fs.removeSync(webpackFolder.distPath);