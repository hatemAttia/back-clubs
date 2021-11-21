const subscribeModel = require("../models/subscribe");


exports.getSubscribers = async(req, res, next) => {

    await subscribeModel
        .find()
        .then((objet) => res.status(200).json(objet))
        .catch((err) => res.status(400).json("Error getting objet"));
};


exports.createSubscriber = async(req, res, next) => {
    const oldemail = await subscribeodel.findOne({ email: req.body.email });
    if (oldemail) { return res.status(400).json({ message: "Email already exists" }); }
    let subscriber = new subscribeModel({
        email: req.body.email,
    });

    await subscriber.save((err) => {
        if (err) {
            res.json({ success: false, message: err })

        } else {
            res.json({ success: true, subscriber })
        }


    })
};

exports.subscribersCount = async(req, res, next) => {
    const subscribeCount = await subscribeModel.countDocuments((count) => count)
    if (!subscribeCount) {
        res.status(400).json("Error getting objet")
    }
    res.status(200).json({ "count": subscribeCount })
}