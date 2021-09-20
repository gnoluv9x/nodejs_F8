const express = require('express');
const router = express.Router();
 
const courseController = require('../app/controllers/CoursesController')

router.get('/create' , courseController.create);
router.post('/stored' , courseController.stored);
router.get('/:slug' , courseController.show);

module.exports = router;
