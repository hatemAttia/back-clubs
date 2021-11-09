const categoryModel = require("../models/category");
const domaineModel = require("../models/domaine");
// const mongoose = require('mongoose');


exports.welcome = async(req, res) => {
    res.json("Hello world!!")
};
exports.getCategories = async(req, res, next) => {
    //<= $lte >= gte  age:{$lte:10} < lt > gt ==eq $in  nin []
    //find(element=>element.modelId==req.params.id)
    await categoryModel.find()
        .then(objet => res.status(200).json(objet))
        .catch(err => res.status(400).json("Error getting objet"))
}


exports.createCategoryy = async(req, res, next) => {
    const idDomaine = req.body.domaine.id

    let category = new categoryModel({
        name: req.body.name,

    });

    await category.save(async(err) => {
        if (err) {
            res.json({ success: false, message: "category created successfully" })

        } else {
            const domaine = domaineModel.findById({
                _id: idDomaine,
            }).exec()

            console.log("helllo ", domaine);



            // await Promise.all([speciality.save(), teacher.save()]);


            // if (Array.isArray(domaine.category)) {
            domaine.categories.push(idDomaine);
            // } else {
            //     domaine.category = [idDomaine];
            // }
            console.log(domaine);
            console.log(category);
            // domaine.category.push(category.id)
            await domaine.save().then()
            res.json({ success: true, category })
        }

        // }
        //     .then(() => res.status(200).json({ message: "category created successfully" }))
        //     .catch(err => res.status(400).json({ message: "Error creating an category" }))
    })


};

exports.createCategory = (req, res, next) => {
    domaineModel.findById({ _id: req.body.domaine.id })
        .exec()
        .then((domain) => {
            let category = new categoryModel({
                name: req.body.name,
            });
            category
                .save()
                .then((category) => {
                    domain.categories.push(category._id);
                    domain
                        .save()
                        .then((domain) => res.status(200).json(domain))
                        .catch((err) =>
                            res.status(400).json("Error on domain save: " + err)
                        );
                })
                .catch((err) => res.status(400).json("Error on category save: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
};