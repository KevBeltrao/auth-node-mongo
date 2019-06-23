const { ensureAuthenticated } = require('../../config/auth');

module.exports = (app) => {
  app.get('/account', ensureAuthenticated, (req, res) => {
    res.render('account', {
      name: req.user.name
    });
  });
}