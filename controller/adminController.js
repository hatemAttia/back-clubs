const mongoose = require('mongoose');
const express = require('express');
const adminModel = require('../models/admin');
const bcrypt = require('bcryptjs');
//const joi = require('joi');

const jwt = require('jsonwebtoken');
const secret = 'test';
const _ = require('lodash');

//hedhi ili nadhreb aleha 
exports.login = async(req, res, next) => {

    let admin = await adminModel.findOne({ email: req.body.email });
    if (!admin) { return res.status(400).json({ message: "Invalid Email or Password " }); }


    const checkPassword = await bcrypt.compare(req.body.password, admin.password);
    if (!checkPassword) { return res.status(400).json({ message: "Invalid Email or Password " }); }

    const token = admin.generateTokens()

    // await admin.save();
    res.status(200).json({ token: token, admin: { _id: admin.id, email: admin.email, role: admin.role, image: admin.image } });


}



exports.register = async(req, res, next) => {

    const oldadmin = await adminModel.findOne({ email: req.body.email });
    if (oldadmin) { return res.status(400).json({ message: "Email already exists" }); }

    const admin = new adminModel(req.body);
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);
    admin.role = "role_Admin"


    await admin.save();
    const token = admin.generateTokens();
    res.header('x-auth-token', token).send(_.pick(admin, ['_id', 'email']));

}