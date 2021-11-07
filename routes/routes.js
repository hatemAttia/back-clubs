const categoryController = require('../controller/categoryController');
const clubController = require('../controller/clubController')
const sendController = require('../controller/sendMailController');
const adminController = require('../controller/adminController');
import { uploadimages } from "../config/multer"
export default (app) => {

    app.route("/").get(categoryController.welcome);

    ////////////////////////Admin CONTROLLER///////////////////////////

    app.route("/admin/register").post(adminController.register);
    app.route("/admin").post(adminController.login);
    app.route("/admin/club").post(clubController.createClub);
    app.route("/admin/club").get(clubController.getAllClubs);
    app.route("/admin/club/:id").delete(clubController.deleteClub);
    app.route("/admin/clubs").post(clubController.deleteMultipleClub);

    app.route("/admin/club/:id").put(clubController.updateClub);
    app.route("/admin/club-img/:id").post(uploadimages.single("file"), clubController.updateImage);

    ////////////////////////Category CONTROLLER///////////////////////////
    app.route("/category").post(categoryController.createCategory);
    app.route("/category").get(categoryController.getCategories);

    ////////////////////////Club CONTROLLER///////////////////////////    
    app.route("/club").get(clubController.getAllClubs);
    app.route("/club").post(clubController.createClub);
    app.route("/club/:id").delete(clubController.deleteClub);
    app.route("/club/:id").put(clubController.updateClub);
    app.route("/club-img/:id").post(uploadimages.single("file"), clubController.updateImage);

    //////////////////////// Mail CONTROLLER///////////////////////////
    app.route("/send").post(sendController.sendMail);
};