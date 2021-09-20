const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const methodOverride = require('method-override');
const handlebars  = require('express-handlebars');
const route = require('./routes/'); // auto import index.js file
const db = require('./config/db/')

// Connect to db
db.connect();

// Overwrite methods
app.use(methodOverride('_method'));

// static file
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.urlencoded({
    extended : true,
}));
app.use(express.json());

// Template engine
app.engine('.hbs', handlebars({
    extname: '.hbs', 
    helpers: {
        sum : (a, b) => a + b
    }
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resource','views'));

// Route init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
