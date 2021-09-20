const Course = require('../models/Course');
const { multipleMongooseToObject} = require('../../util/mongoose');

class MeController {

    // [GET] /me/courses
    show(req, res, next) {
        Course.find({})
            .then(courses => res.render('courses/myCourses', {
                courses : multipleMongooseToObject(courses)
            }))
            .catch(next);
    }
}

module.exports = new MeController;
