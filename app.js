// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config();

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');
hbs.registerHelper('increment', function (value) {
	return parseInt(value) + 1;
});
hbs.registerHelper("sortingButtons", function (column, options) {
  const ascButton = `<button onclick="window.location.href='/products/sort?col=${column}&ord=asc'" class="btn btn-light btn-sm" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .2rem; --bs-btn-font-size: .7rem;" >↑</button>`;
  const descButton = `<button onclick="window.location.href='/products/sort?col=${column}&ord=desc'" class="btn btn-light btn-sm" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .2rem; --bs-btn-font-size: .7rem;" >↓</button>`;
  return new hbs.SafeString(ascButton + descButton);
});


const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app);

const capitalize = require('./utils/capitalize');
const projectName = 'project2-dashboard';

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes');
app.use('/', indexRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

const usersRoutes = require('./routes/users.routes');
app.use('/users', usersRoutes);

const productRoutes = require('./routes/product.routes');
app.use('/products', productRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
