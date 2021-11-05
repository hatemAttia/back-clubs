const categoryController = require('../controller/categoryController');
const clubController = require('../controller/clubController')
const sendController = require('../controller/sendMailController');
import { uploadimages } from "../config/multer"




export default (app) => {

    app.route("/").get(categoryController.welcome);

    ////////////////////////Category CONTROLLER///////////////////////////
    app.route("/category").post(categoryController.createCategory);
    app.route("/category").get(categoryController.getCategories);

    ////////////////////////Club CONTROLLER///////////////////////////    
    app.route("/club").get(clubController.getAllClubs);
    app.route("/club").post(clubController.createClub);
    app.route("/club/:id").delete(clubController.deleteClub);
    app.route("/club/:id").put(clubController.updateClub);
    app.route("/club-img/:id").post(uploadimages.single("file"),clubController.updateImage);

    //////////////////////// Mail CONTROLLER///////////////////////////
    app.route("/send").post(sendController.sendMail);  
};