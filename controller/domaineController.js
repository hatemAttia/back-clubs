const domaineModel = require("../models/domaine");


exports.getCategoryByDomaine = async(req, res, next) => {
    const domaine = await domaineModel.findById(req.params.id).populate('category')
        // .then(objet => res.status(200).json(objet))
        // .catch(err => res.status(400).json("Error getting objet"))
    if (domaine) {
        res.json(domaine)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
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