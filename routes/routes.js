const welcomeController = require('../controller/welcomeController');

const sendController = require('../controller/sendMailController');

export default (app) => {
    app.route("/").get(welcomeController.welcome);
    app.route("/send").post(sendController.sendMail);
};