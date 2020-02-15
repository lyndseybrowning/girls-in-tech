const { MongoClient } = require("mongodb");

async function main(callback) {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri =
        "mongodb+srv://user:d3z1oEaK6Mmgsy9P@girlsintech-brihq.mongodb.net/test?retryWrites=true&w=majority";

    try {
        MongoClient.connect(uri, { useUnifiedTopology: true }, (err, db) => {
            if (err) throw err;

            const dbo = db.db("datasets");
            const collection = dbo.collection("youtube-gb");

            collection
                .aggregate([
                    { $match: {} },
                    {
                        $group: {
                            _id: "$title",
                            videoId: { $first: "$video_id" },
                            description: { $first: "$description" },
                            categoryId: { $first: "$category_id" },
                            trendingDate: { $first: "$trending_date" },
                            thumbnail: { $first: "$thumbnail_link" },
                            likes: { $sum: "$likes" },
                            dislikes: { $sum: "$dislikes" },
                            comments: { $sum: "$comment_count" },
                            views: { $sum: "$views" },
                        },
                    },
                    { $sort: { views: -1 } },
                ])
                .toArray((err, results) => {
                    if (err) throw err;

                    callback(results);
                });
        });
    } catch (e) {
        console.error(e);
    }
}

module.exports = main;
