const Course = require('../models/Course');
const { multipleMongooseToObject} = require('../../util/mongoose');

class MeController {

    // [GET] /me/courses
    show(req, res, next) {
        Course.find({})
            .then(courses => res.render('courses/stored-courses', {
                courses : multipleMongooseToObject(courses)
            }))
            .catch(next);
    }
    // [GET] /me/trash/courses
    trash(req, res, next) {
        Course.findDeleted({})
            .then(courses => res.render('courses/trash-courses', {
                courses : multipleMongooseToObject(courses)
            }))
            .catch(next);
    }


}

module.exports = new MeController;
