var nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

exports.sendMail = asyncHandler(async(req, res) => {

    const {

        email,
        subject,
        message,
        name
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
        to: email,
        subject: "email from " + email + "name" + name + " about " + subject,
        text: message
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