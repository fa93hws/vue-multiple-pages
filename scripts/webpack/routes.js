const path = require('path');

module.exports = {
  frontDist: path.resolve(__dirname, '../static/dist'),
  views: 'views',
  vueEntry: 'vue-entry.js',
  vendorDependencies: ['vue']
}