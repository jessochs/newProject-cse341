const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const app = express();


const { auth, requiresAuth } = require('express-openid-connect');

// these all need to be out in the .env somehow
const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  clientID: 'WORQeirdEE9JQrsbiPxG2d40vk4gHevn',
  issuerBaseURL: 'https://dev-uv2ukics8urr50jv.us.auth0.com',
  //   process.env.ISSUER_BASE_URL
  secret: '6C6PE242cLx62t7_k_-aMKkXtanojkhO4OUUOZormvmgmTEf3GpCWnm9ZsD_5DIy'
};

// The `auth` router attaches /login, /logout
// and /callback routes to the baseURL
app.use(auth(config));

// req.oidc.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(
    req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
  )
});

// The /profile route will show the user profile as JSON
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});

app.listen(3000, function() {
  console.log('Listening on http://localhost:3000');
});

const swaggerDocument = require('./swagger.json');

const mongodb = require('./db/connect');
// const contactRoutes = require('./routes/contacts');


const port = process.env.PORT || 8080;

app
.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});


mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});