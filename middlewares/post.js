
function apply404Middlewares(app) {
  app.use(function(req, res, next){
    res.status(404);
  
    // respond with html page
    if (req.accepts('html')) {
      res.render('pages/404', { url: req.url });
      return;
    }
  
    // respond with json
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }
  
    // default to plain-text. send()
    res.type('txt').send('Not found');
  });
}

// app: express-instance
export default function(app) {
  apply404Middlewares(app);
}