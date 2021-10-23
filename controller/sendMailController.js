var nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

exports.sendMail = asyncHandler(async(req, res) => {
    // const emailExists = await User.findOne({ email: req.body.email });
    // if (emailExists) return res.status(400).send('Email is already exists ');
    const {
        // emaila,
        email,
        obj,
        msg
    } = req.body
    console.log(req.body)

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'samplateforme2021@gmail.com',

            pass: 'PfeSamAdmin2021'
        }
    });

    var mailOptions = {
        from: "samplateforme2021@gmail.com",
        to: req.body.email,
        subject: req.body.obj,
        text: req.body.msg
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.status(200).json('message envoyé')

})