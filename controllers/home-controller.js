module.exports = {
  index(req, res) {
    res.render('pages/home/template', { author: 'fa93hws', title: 'This is the home page' });
  }
}