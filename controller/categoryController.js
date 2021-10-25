const categoryModel = require("../models/category");
// const mongoose = require('mongoose');


exports.welcome = async(req, res) => {
    res.json("Hello world!!")
};


exports.postCategory = async(req, res, next) => {
    let category = new categoryModel({
        name: req.body.name
    });

    await category.save((err) => {
        if (err) {
            res.json({ success: false, message: "category created successfully" })

        } else {
            res.json({ success: true, category })
        }

        // }
        //     .then(() => res.status(200).json({ message: "category created successfully" }))
        //     .catch(err => res.status(400).json({ message: "Error creating an category" }))
    })


};