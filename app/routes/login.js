const passport = require('passport');

module.exports = (app) => {
  app.get('/login', (req, res) => {
    res.render('login');
  });

  app.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/account',
      failureRedirect: '/login', 
      failureFlash: true
    })(req, res, next);
  });

  app.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('login');
  });
}