const domaineModel = require("../models/domaine");
// const categoryModel = require("../models/category");


exports.getClybByDomaine = async(req, res, next) => {
    const domaine = await domaineModel.findById(req.params.id).populate({ path: "categories", populate: { path: "clubs", }, })
    console.log(req.body.id);
    if (domaine) {
        res.json(domaine)

    } else {
        res.status(404)
        throw new Error('Domaine not found')
    }
}

exports.getAllDomaines = async(req, res, next) => {

    await domaineModel.find().populate('categories')
        .then(objet => res.status(200).json(objet))
        .catch(err => res.status(400).json("Error getting objet"))
}


exports.createDomaine = async(req, res, next) => {
    let club = new domaineModel({
        name: req.body.name,
    });

    await club.save((err) => {
        if (err) {
            res.json({ success: false, message: err })

        } else {
            res.json({ success: true, club })
        }


    })
};