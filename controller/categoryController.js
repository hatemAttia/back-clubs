const categoryModel = require("../models/category");
const domaineModel = require("../models/domaine");
// const mongoose = require('mongoose');

exports.welcome = async (req, res) => {
  res.json("Hello world!!");
};
exports.getCategories = async (req, res, next) => {
  
  await categoryModel
    .find()
    .then((objet) => res.status(200).json(objet))
    .catch((err) => res.status(400).json("Error getting objet"));
};




exports.createCategory = (req, res, next) => {
  domaineModel
    .findById({ _id: req.body.domaine.id })
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
