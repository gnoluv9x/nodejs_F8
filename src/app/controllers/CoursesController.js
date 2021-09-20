const Course = require('../models/Course');
const { mongooseToObject} = require('../../util/mongoose');
const { response } = require('express');

class CoursesController {

    // [GET] /courses/:slug/
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course => {
                res.render('courses/show', {
                    course : mongooseToObject(course)
                })
            })
            .catch(next)

    };

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create')
    };

    // [POST] /courses/stored
    stored(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${formData.videoId}/hqdefault.jpg`
        Course.create(formData)
            .then( () =>  res.redirect('/'))
            .catch(err => console.log(err));
    }

}

module.exports = new CoursesController;
