const clubModel = require("../models/club");
const categoryModel = require("../models/category");
const mongoose = require('mongoose');


exports.postClub = async(req, res, next) => {
    let club = new clubModel({
        name: req.body.name,
        description: req.body.description,
        image: 'club.png',
        adresse: req.body.adresse,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        category: mongoose.Types.ObjectId(req.body.category),
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



exports.getClub = async(req, res, next) => {
    //<= $lte >= gte  age:{$lte:10} < lt > gt ==eq $in  nin []
    //find(element=>element.modelId==req.params.id)
    await clubModel.find().populate('category')
        .then(objet => res.status(200).json(objet))
        .catch(err => res.status(400).json("Error getting objet"))
}


exports.welcome = async(req, res) => {
    res.json("Hello world!!")
};