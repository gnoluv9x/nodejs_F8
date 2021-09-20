const newsRouter = require('./news');
const meRouter = require('./me');
const sitesRouter = require('./sites');
const courseRouter = require('./course');

function route(app){

    app.use('/news', newsRouter);
    app.use('/courses', courseRouter);
    app.use('/me', meRouter);
    app.use('/', sitesRouter);
    
}

module.exports = route;