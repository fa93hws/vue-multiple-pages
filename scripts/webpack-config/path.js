import path from 'path';

const distFolder = 'dist';
const webpackPath = {
  distFolder: distFolder,
  distPath: path.resolve(__dirname, `../../static/${distFolder}`),
  views: 'views',
  vueEntry: 'vue-entry.js',
  vendorDependencies: ['vue']
};

export default webpackPath;