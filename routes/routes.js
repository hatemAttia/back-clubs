const categoryController = require('../controller/categoryController');
const clubController = require('../controller/clubController')
const sendController = require('../controller/sendMailController');
import { uploadimages } from "../config/multer"




export default (app) => {
    app.route("/").get(categoryController.welcome);
    app.route("/ajouter").post(categoryController.postCategory);
    app.route("/get-club").get(clubController.getClub);
    app.route("/ajouter-club").post(clubController.postClub);
    app.route("/send").post(sendController.sendMail);
    app.route("/upload-img").post(uploadimages.single("file"), (req, res) => {
        res.send("eeeee")
    });
    // app.route("/ajouter").post((req, res) => {
    //     welcomeController.postUser
    // });

};