const route = (app, collection) => {
    const $group = {
        _id: "$title",
        videoId: { $first: "$video_id" },
        description: { $first: "$description" },
        categoryId: { $first: "$category_id" },
        trendingDate: { $first: "$trending_date" },
        thumbnail: { $first: "$thumbnail_link" },
        liked: { $first: "$like" },
        likes: { $sum: "$likes" },
        dislikes: { $sum: "$dislikes" },
        comments: { $sum: "$comment_count" },
        views: { $sum: "$views" },
    };

    app.get("/api/top10", (request, response) => {
        const { query } = request;
        const { category } = query;

        collection
            .aggregate([
                { $group },
                { $match: {} },
                { $sort: { [category]: -1 } },
                { $limit: 10 },
            ])
            .toArray((err, result) => {
                if (err) throw err;

                response.json({
                    status: 200,
                    result,
                });
            });
    });
};

module.exports = route;
