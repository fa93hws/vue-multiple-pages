const webpack = require('webpack');
const path = require('path');
const fs = require('fs-extra');

const routes = require('./routes');
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
    else if (source.includes(routes.vueEntry)) files.push(source);
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
function transformEntries(entries) {
  const output = {};
  entries.forEach(entry => {
    const segments = entry.split(path.sep);
    segments.splice(-1);
    segments.splice(0, 2);
    const fileName = segments.join(path.sep) +  '-bundle';
    output[fileName] = `.${path.sep}${entry}`;
  })
  return output;
}

/**
 * @param {string} mode 'development' | 'production' | 'test'
 */
module.exports = function(mode) {
  fs.removeSync(routes.frontDist);
  let entry = collectFiles(routes.views, []);
  entry = transformEntries(entry);
  entry.vendors = routes.vendorDependencies;
  entry['hmr'] = 'webpack-hot-middleware/client?reload=true';
  return webpackConfig = {
    ...require('./config'),
    mode,
    entry,
    watch: mode === 'development'
  }
  // const compiler = webpack(webpackConfig);
  // return compiler;
  // compiler.run((err, stats) => {
  //   if (err || stats.hasErrors()) {
  //     console.log(err);
  //   }
  //   console.log('build done');
  // });
}

