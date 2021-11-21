const mongoose = require('mongoose');
const express = require('express');
const userModel = require('../models/user');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const secret = 'test';
const _ = require('lodash');


exports.login = async(req, res, next) => {

    let user = await userModel.findOne({ email: req.body.email });
    if (!user) { return res.status(400).json({ message: "Invalid Email or Password " }); }


    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    if (!checkPassword) { return res.status(400).json({ message: "Invalid Email or Password " }); }

    const token = user.generateTokens()

    // await user.save();
    res.status(200).json({ token: token, user: { _id: user.id, email: user.email, role: user.role, image: user.image } });


}



exports.register = async(req, res, next) => {

    const olduser = await userModel.findOne({ email: req.body.email });
    if (olduser) { return res.status(400).json({ message: "Email already exists" }); }

    const user = new userModel(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.role = "role_User";
    user.image = "user.png";


    await user.save();
    const token = user.generateTokens();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'email']));

}