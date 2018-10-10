const express = require('express')
const applyPriorMiddlewares = require('./scripts/prior-middlewares');
const applyPostMiddlewares = require('./scripts/post-middlewares');

const app = express();
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')
app.use(express.static('static'))
applyPriorMiddlewares(app);

// router
const homeController = require('./controllers/home-controller');
const userController = require('./controllers/user-controller');
app.get('/', homeController.index);
app.get('/user', userController.users);
app.get('/user/:id', userController.user);


applyPostMiddlewares(app);

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));