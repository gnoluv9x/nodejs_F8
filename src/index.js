const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const handlebars  = require('express-handlebars');
const route = require('./routes/'); // auto import index.js file
const db = require('./config/db/')

// Connect to db
db.connect();

// static file
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.urlencoded({
    extended : true,
}));
app.use(express.json());

// Template engine
app.engine('.hbs', handlebars({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resource','views'));

// Route init
route(app);


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
