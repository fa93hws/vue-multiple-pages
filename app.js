import express from 'express';
import applyPriorMiddlewares from './middlewares/prior';
import applyPostMiddlewares from './middlewares/post';
import homeController from './controllers/home-controller';
import userController from './controllers/user-controller';

const app = express();
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')
applyPriorMiddlewares(app);

// router
app.use(express.static('static'))
app.get('/', homeController.index);
app.get('/user', userController.users);
app.get('/user/:id', userController.user);


applyPostMiddlewares(app);

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));