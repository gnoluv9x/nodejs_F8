const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const methodOverride = require('method-override');
const handlebars  = require('express-handlebars');
const route = require('./routes/'); // auto import index.js file
const db = require('./config/db/');
const sortMiddleware = require('./app/middlewares/SortMiddleware');

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
        sum : (a, b) => a + b,
        sortable : (fieldName , sortObject) => {
            
            const sortType = sortObject.column === fieldName ? sortObject.type : 'default';

            const icons = {
                default : 'fas fa-sort',
                desc : 'fal fa-sort-amount-down',
                asc : 'fal fa-sort-amount-up'
            };
            const types = {
                default : 'asc',
                desc : 'asc',
                asc : 'desc',
            };

            const icon = icons[sortType];
            const type = types[sortType];

            return `
            <a href="?_sort&column=${fieldName}&type=${type}">
                <i class="${icon}"></i>
            </a>
            `
        }
    }
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resource','views'));

// Custome Middleware
app.use(sortMiddleware)

// Route init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
