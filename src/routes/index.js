const newsRouter = require('./news');
const sitesRouter = require('./sites');
const courseRouter = require('./course');

function route(app){

    app.use('/news', newsRouter);
    app.use('/courses', courseRouter);
    app.use('/', sitesRouter);
    
}

module.exports = route;