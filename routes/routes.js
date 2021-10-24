const welcomeController = require('../controller/welcomeController');

const sendController = require('../controller/sendMailController');
import { uploadimages } from "../config/multer"
export default (app) => {
    app.route("/").get(welcomeController.welcome);
    app.route("/send").post(sendController.sendMail);
    app.route("/upload-img").post(uploadimages.single("file"), (req, res) => {
        res.send("eeeee")
    });

};