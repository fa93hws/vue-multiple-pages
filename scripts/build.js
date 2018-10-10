import webpack from 'webpack';
import { ncp } from 'ncp';

import configProducer from './webpack-config/config-producer';

function copyFiles() {
  const args = process.argv.filter(arg => arg.split(0,7) === 'target=');
  let distPath = './dist';
  if (args.length > 0)  [,distPath] = args[args.length - 1].split('=');

  ncp.limit = 16;
  ncp('views', `${distPath}/views`, function(err) {
    if (err) console.log(err);
    console.log('copy views success');
  });
  ncp('static', `${distPath}/static`, function(err) {
    if (err) console.log(err);
    console.log('copy static folder success');
  })
}

const webpackConfig = configProducer('production');
const compiler = webpack(webpackConfig);
// console.log(webpackConfig);
compiler.run((err, stats) => {
  if (err || stats.hasErrors()) {
    console.log(err);
  }
  console.log('build success');
  copyFiles();
});