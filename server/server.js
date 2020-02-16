const express = require("express");
const connect = require("./connection");
const initialiseRoutes = require("./initialiseRoutes");

const ROOT_DIR = "src";
const PORT = 3000;
const app = express();

if (process.env.NODE_ENV !== "production") {
    require("dot-env");
}

connect(collection => {
    initialiseRoutes(app, collection);

    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
    app.use(express.static(ROOT_DIR));
}).catch(console.error);
