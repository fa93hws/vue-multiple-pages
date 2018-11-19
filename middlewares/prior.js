/**
 * parse mode from command lines (env=xxx), default value is 'production'
 * @return {string} 'development' | 'production'
 */
function parseMode() {
  const defaultVal = 'production';
  const theFields = process.argv.filter(a => a.slice(0, 4) === 'env=');
  if (theFields.length < 1) return defaultVal;
  const [,val] = theFields[theFields.length - 1].split('=');
  if (val !== 'development' && val !== 'production') return defaultVal;
  else return val;
}

// app: express instance
function applyWebpackMiddlewares(app) {
  const configProducer = require('../scripts/webpack-config/config-producer').default;
  const webpack = require('webpack');
  const middleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackFolder = require('../scripts/webpack-config/path').default;

  const config = configProducer('development');
  const compiler = webpack(config);
  app.use(middleware(compiler, {
    watchOptions: {
      poll: true
    },
    publicPath: `/${webpackFolder.distFolder}/`
    // writeToDisk: true
    // webpack-dev-middleware options
  }));
  app.use(webpackHotMiddleware(compiler));
}

/**
 * overload res.render function
 * append mode = "development" to view data
 * @param {request} req
 * @param {response} res
 * @param {function} next middle ware function
 */
function addModeToRender(req, res, next) {
  const originRender = res.render;
  res.render = function(view, data, callback) {
    data = { ...data, mode: 'development' };
    originRender.call(res, view, data, callback);
  }
  next();
}

function redirectHotReload(req, res, next) {
  if (req.url.slice(0, 5) !== '/dist' && req.url.match(/hot-update.(json|js)$/)) {
    res.redirect('/dist' + req.url);
  } else {
    next();
  }
}

// app: express instance
export default function(app) {
  const mode = parseMode();
  if (mode === 'development') {
    applyWebpackMiddlewares(app);
    app.use(addModeToRender);
    app.use(redirectHotReload);
  }
}


