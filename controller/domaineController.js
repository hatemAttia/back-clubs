const domaineModel = require("../models/domaine");
const categoryModel = require("../models/category");


exports.getCategoryByDomaine = async(req, res, next) => {
    const domaine = await domaineModel.findById(req.body.id).populate({ path: "categories", populate: { path: "clubs", }, })
    const category =
        console.log(req.body.id);
    if (domaine) {


        res.json(domaine)
            // console.log(domaine.categories._id);
            // const categoryArray = domaine.categories;
            // categoryArray.forEach(async(element) => {

        //     await categoryModel.findById({ "_id": element }).then(objet => res.json(objet))

        // })

    } else {
        res.status(404)
        throw new Error('Order not found')
    }
}

exports.getAllDomaines = async(req, res, next) => {

    await domaineModel.find()
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