const clubModel = require("../models/club");
const categoryModel = require("../models/category");
const domaineModel = require("../models/domaine");
const mongoose = require('mongoose');


exports.createClub = async(req, res, next) => {
    let club = new clubModel({
        name: req.body.name,
        description: req.body.description,
        image: 'club.png',
        adresse: req.body.adresse,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        category: mongoose.Types.ObjectId(req.body.category.id),
        // category: req.body.category._id,
        email: req.body.email,
        num: req.body.num

    });

    await club.save((err) => {
        if (err) {
            res.json({ success: false, message: err })

        } else {
            res.json({ success: true, club })
        }

    })
};



exports.createClubs = (req, res, next) => {
    categoryModel.findById({ _id: req.body.category })
        .exec()
        .then((category) => {
            let club = new clubModel({
                name: req.body.name,
                description: req.body.description,
                image: 'club.png',
                adresse: req.body.adresse,
                longitude: req.body.longitude,
                latitude: req.body.latitude,
                email: req.body.email,
                num: req.body.num
            });
            club
                .save()
                .then((club) => {
                   
                    category.clubs.push(club._id);
                    category
                        .save()
                        .then((category) => res.status(200).json(category))
                        .catch((err) =>
                            res.status(400).json("Error on category save: " + err)
                        );
                })
                .catch((err) => res.status(400).json("Error on club save: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
};



exports.getAllClubs = async(req, res, next) => {
    
    await clubModel.find().populate('category')
        .then(objet => res.status(200).json(objet))
        .catch(err => res.status(400).json("Error getting objet"))
}


exports.getClubByCategory= async(req, res, next) => {
    const club = await categoryModel.findById(req.body.category).populate('clubs')
       
    if (club) {
        res.json(club)
    } else {
        res.status(404)
        throw new Error('club not found')
    }
}



exports.welcome = async(req, res) => {
    res.json("Hello world!!")
};

exports.deleteClub = async(req, res) => {
    const club = await clubModel.findById(req.params.id)
    console.log(req.param.id);

    if (club) {
        await club.remove()
        res.json({ message: 'Club removed' })
    } else {
        res.status(404)
        throw new Error('Club not found')
    }
}



exports.updateClub = async(req, res) => {
    console.log(req.params.id);
    console.log("hello");

    const club = await clubModel.findById(req.params.id)
    if (club) {
        club.name = req.body.name || club.name
        club.description = req.body.description || club.description
        club.image = req.body.image || club.image
        club.adresse = req.body.adresse || club.adresse
        club.longitude = req.body.longitude || club.longitude
        club.latitude = req.body.latitude || club.latitude
        club.category = req.body.category || club.category
        club.email = req.body.email || club.email
        club.num = req.body.num || club.num

        const updatedClub = await club.save()

        res.json(updatedClub)


    } else {
        res.status(404)
        throw new Error('User not found')
    }
}


exports.updateImage = async(req, res) => {
    console.log(req.file.filename);
    console.log("hello");

    const club = await clubModel.findById(req.params.id)
    if (club) {

        club.image = req.file.filename || club.image


        const updatedimage = await club.save()

        res.json(updatedimage)


    } else {
        res.status(404)
        throw new Error('User not found')
    }
}

exports.deleteMultipleClub = async(req, res) => {
    if (req.body) {

        const clubsArray = req.body;
        clubsArray.forEach(async(element) => {

            await clubModel.deleteOne({ "_id": element._id })

        });
        res.json({ message: 'Club removed' })
    } else {
        res.status(404)
        throw new Error('Clubs not found')
    }
}







    
// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = (async(req, res) => {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        )

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length

        await product.save()
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = (async(req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)

    res.json(products)
})