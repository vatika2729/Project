const CampGround = require('../models/campground');
const { cloudinary } = require('../cloudinary');
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAP_TOKEN;


module.exports.index = async (req, res) => {
    const campgrounds = await CampGround.find({});
    res.render('campgrounds/index', { campgrounds })
}

module.exports.newCampground = (req, res) => {
    res.render('campgrounds/new')
}

module.exports.addCampground = async (req, res, next) => {
    const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
    const campground = new CampGround(req.body.campground);
    campground.geometry = geoData.features[0].geometry;
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', "Campground added successfully!")
    res.redirect(`campgrounds/${campground._id}`);
}

module.exports.getCampground = async (req, res) => {
    const { id } = req.params;
    const campgrounds = await CampGround.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!campgrounds) {
        req.flash('error', "Sorry !! We could not found that campground");
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campgrounds })
}

module.exports.geteditFormCampground = async (req, res) => {

    const { id } = req.params;
    const campgrounds = await CampGround.findById(id);

    if (!campgrounds) {
        req.flash('error', "Sorry !! We could not found that campground");
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campgrounds })
}

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    //created campground in name fetch the data and get the campground object and spread the data and get it in the forme
    const campgrounds = await CampGround.findByIdAndUpdate(id, { ...req.body.campground });

    const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
    campground.geometry = geoData.features[0].geometry;

    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campgrounds.images.push(...imgs);
    await campgrounds.save();

    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            console.log(filename)
            await cloudinary.uploader.destroy(filename)
        }
        await campgrounds.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
        console.log(campgrounds)
    }


    req.flash('success', "Campground updated successfully!")
    res.redirect(`/campgrounds/${campgrounds._id}`);
}

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    const campgrounds = await CampGround.findByIdAndDelete(id);
    req.flash('success', "Campground deleted successfully!")
    res.redirect(`/campgrounds`);
}