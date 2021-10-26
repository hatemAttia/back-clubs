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

// exports.updateClubs = async(id, res) => {
//     const model = await Model.update({ _id: id }, {
//             $set: {
//                 "name": "hattem10",
//                 "description": "vvhc",
//                 "image": "adavdaz",
//                 "adresse": "sousse",
//                 "longitude": "9653",
//                 "latitude": "8542",
//                 "category": "6175a52967bee5227094a7bd",

//                 "email": "hanzoutib@gmail.com",
//                 "num": "98745612"
//             }
//         }).then(() => {
//             res.status(200).json(' Deleted')
//             console.log(model + 'updated succesfuly !')
//         })
//         .catch(err => res.status(400).json('Error deleting ' + err));
// }


exports.updateClubs = async(req, res) => {
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