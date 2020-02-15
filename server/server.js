const express = require("express");
const connect = require("./connection");
const initialiseRoutes = require("./initialiseRoutes");

const ROOT_DIR = "src";
const PORT = 3000;
const app = express();

connect(items => {
    initialiseRoutes(app, items);

    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
    app.use(express.static(ROOT_DIR));
}).catch(console.error);
