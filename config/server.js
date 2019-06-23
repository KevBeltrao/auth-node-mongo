const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

require('dotenv').config();

const app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');

//Passport config
require('./passport')(passport);

//Body-parser
app.use(express.urlencoded({ extended: false }));

//Express Session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
//passport middleware
app.use(passport.initialize());
app.use(passport.session())

//Connect flash
app.use(flash());

app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
	next();
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

module.exports = app;