const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const campgrounds = require('../controller/campgrounds');
const multer = require('multer');
const { storage } = require('../cloudinary');


//setting the location of storing image file.
const upload = multer({ storage });



router.get('/', isLoggedIn, catchAsync(campgrounds.index));

router.get('/new', isLoggedIn, campgrounds.newCampground);

router.post('/', isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.addCampground));
// router.post('/', upload.array('image'), (req, res) => {
//     console.log(req.body, req.files);
//     res.send("hurray!!!")
// })



router.get('/:id', isLoggedIn, catchAsync(campgrounds.getCampground));


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.geteditFormCampground));

router.put('/:id', isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));


module.exports = router;