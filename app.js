// load the things we need
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressLayouts = require('express-ejs-layouts');

const homeController = require('./controllers/homeController');

//Initiate our app
const app = express();
//Configure our app
// set the view engine to ejs
app.set('layout', 'layouts/layout');
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use("/public", express.static(path.join(__dirname, 'public')));
app.set('views','./public/views');

// index page 
app.use('/', homeController);

port = process.env.PORT || 80
app.listen(port, () => console.log('Server running on http://localhost:8000/'));
