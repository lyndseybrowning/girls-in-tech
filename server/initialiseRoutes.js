const routes = require("./routes");

const initialiseRoutes = (app, data) => {
    routes.forEach(route => route(app, data));
};

module.exports = initialiseRoutes;
