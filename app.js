const express = require('express')
const fakeData = require('./models/fake-data');

const app = express();
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')
app.use(express.static('static'))

// webpack dev middleware
const middleware = require('webpack-dev-middleware');
const config = require('./scripts/build-front')('development');
const webpack = require('webpack');
const webpackHotMiddleware = require('webpack-hot-middleware');
const compiler = webpack(config);
app.use(middleware(compiler, {
  watchOptions: {
    poll: true
  },
  publicPath: '/dist/'
  // writeToDisk: true
  // webpack-dev-middleware options
}));
app.use(webpackHotMiddleware(compiler));

// router
const homeController = require('./controllers/home-controller');
app.get('/', homeController.serve);


const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));