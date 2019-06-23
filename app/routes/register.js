const User = require('../../models/User');
const bcrypt = require('bcryptjs');

module.exports = (app) => {
  app.get('/register', (req, res) => {
    res.render('register');
  });

  app.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];
    //Checking for unfilled fields
    if(!name || !email || !password || !password2) {
      errors.push({ msg: 'Please, fill in all the fields' });
    }
    //Checking if passwords match
    if(password !== password2) {
      errors.push({ msg: 'Passwords don\'t match' });
    }

    //Checking password length
    if(password.length < 6) {
      errors.push({ msg: 'Password should have at least 6 characters' });
    }

    if(errors.length) {
      res.render('register', {
        errors,
        name,
        email
      });
    }
    else {
      User.findOne({ email: email })
        .then(user => {
          if(user) {
            //User exists
            errors.push({ msg: 'Email is already registered' });
            res.render('register', {
              errors,
              name,
              email
            });
          }
          else {
            const newUser = new User({
              name,
              email,
              password
            });

            //Hash password
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                //Set password to hashed
                newUser.password = hash;
                //Save user
                newUser.save()
                  .then(user => {
                    req.flash('success_msg', 'You are now registered and can log in');
                    res.redirect('/login');
                  })
                  .catch(err => console.log(err));
              });
            });
          }
        });
    }
  });
}