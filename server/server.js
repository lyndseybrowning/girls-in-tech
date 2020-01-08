const express = require("express");
const Datastore = require("nedb");
const initialiseRoutes = require("./initialiseRoutes");

const ROOT_DIR = "src";
const PORT = 3000;
const app = express();

const database = new Datastore("./youtube.db");
const fields = {
    title: 1,
    views: 1,
    category_id: 1,
    publish_time: 1,
    channel_title: 1,
    likes: 1,
    dislikes: 1,
    comment_total: 1,
    thumbnail_link: 1,
};

database.loadDatabase();
database
    .find({ channel_title: { $ne: "YouTube Spotlight" } }, fields)
    .exec((err, db) => {
        if (err) {
            console.log(`Error loading Database: ${err}`);
            return;
        }

        const data = db.map(
            ({
                category_id: categoryId,
                channel_title: channel,
                comment_total: comments,
                thumbnail_link: thumbnail,
                title,
                likes,
                dislikes,
                views,
            }) => ({
                title,
                channel,
                comments: Number(comments),
                likes: Number(likes),
                dislikes: Number(dislikes),
                views: Number(views),
                categoryId,
                thumbnail,
            }),
        );

        initialiseRoutes(app, data);

        app.listen(PORT, () => console.log(`listening on port ${PORT}`));
        app.use(express.static(ROOT_DIR));
    });
