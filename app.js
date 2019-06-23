const app = require('./config/server');

const homeRoute = require('./app/routes/home');
homeRoute(app);

const loginRoute = require('./app/routes/login');
loginRoute(app);

const registerRoute = require('./app/routes/register');
registerRoute(app);

const accountRoute = require('./app/routes/account');
accountRoute(app);

app.listen(3000);