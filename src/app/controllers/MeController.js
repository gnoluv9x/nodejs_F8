const Course = require('../models/Course');
const { multipleMongooseToObject} = require('../../util/mongoose');

class MeController {

    // [GET] /me/courses
    storedCourses(req, res, next) {

        let courseQuery = Course.find({});
        
        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            })
        }


        Promise.all([ courseQuery , Course.countDocumentsDeleted() ])
            .then( ([courses , deletedCourse ]) => {
                res.render('courses/stored-courses', {
                    deletedCourse,
                    courses : multipleMongooseToObject(courses)
                })
            });
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
