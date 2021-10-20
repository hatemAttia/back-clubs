const welcomeController = require('../controller/welcomeController');

export default (app) => {
    app.route("/").get(welcomeController.welcome);
};