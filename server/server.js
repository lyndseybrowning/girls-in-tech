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
    comment_count: 1,
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

        const getUniqueEntries = entries => {
            const uniqueEntries = entries.filter((entry, index, arr) => {
                return (
                    arr.findIndex(item => item.title === entry.title) === index
                );
            });

            return uniqueEntries;
        };
        const data = db.map(
            ({
                category_id: categoryId,
                channel_title: channel,
                comment_count: comments,
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

        const uniqueEntries = getUniqueEntries(data);

        initialiseRoutes(app, uniqueEntries);

        app.listen(PORT, () => console.log(`listening on port ${PORT}`));
        app.use(express.static(ROOT_DIR));
    });
