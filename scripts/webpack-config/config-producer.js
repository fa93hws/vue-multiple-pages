import path from 'path';
import fs from 'fs';

import webpackPath from './path';
import baseConfig from './base-config';

/**
 * collect all vue-entry.js in views folder, DFS algorithm
 * @param {string} folder target folder
 * @param {string[]} files file names (pages/home/vue-entry.js -> pages/home)
 */
function collectFiles(targetFolder, files) {
  const folders = [];
  fs.readdirSync(targetFolder)
  .map(name => path.join(targetFolder, name))
  .forEach(source => {
    if (fs.lstatSync(source).isDirectory()) folders.push(source);
    else if (source.includes(webpackPath.vueEntry)) files.push(source);
  })
  folders.forEach(f => collectFiles(f, files));
  return files;
}

/**
 * generate object entry for webpack
 * @param {string[]} entries entry file path (absolute path)
 * @return {object} { fileName: path } 
 * @return {string} fileName: relative path to pages. such as pages/home-bundle
 */
function transformEntries(entries, mode = "production") {
  const output = {};
  entries.forEach(entry => {
    const segments = entry.split(path.sep);
    segments.splice(-1);
    segments.splice(0, 2);
    const fileName = segments.join(path.sep) +  '-bundle';
    output[fileName] = [`.${path.sep}${entry}`];
    if (mode === 'development')
      output[fileName].push('webpack-hot-middleware/client?reload=true');
  })
  return output;
}

/**
 * @param {string} mode 'development' | 'production' | 'test'
 */
export default function(mode) {
  let entry = collectFiles(webpackPath.views, []);
  entry = transformEntries(entry, mode);
  entry.vendors = webpackPath.vendorDependencies;
  const webpackConfig = {
    ...baseConfig,
    mode,
    entry,
    watch: mode === 'development'
  };
  return webpackConfig;
}

