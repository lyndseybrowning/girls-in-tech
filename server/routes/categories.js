const cats = require("../../categories.json");

const route = (app, collection) => {
    const $group = {
        _id: "$category_id",
        categoryId: { $first: "$category_id" },
        videos: { $sum: 1 },
    };

    app.get("/api/categories", (request, response) => {
        collection
            .aggregate([{ $group }, { $match: {} }])
            .toArray((err, result) => {
                if (err) throw err;

                const categories = result
                    .map(({ categoryId, videos }) => {
                        const category = cats.items.find(
                            item => item.id == categoryId,
                        );

                        if (!category) return null;

                        return {
                            category: category.snippet.title,
                            videos,
                        };
                    })
                    .filter(Boolean);

                response.json({
                    status: 200,
                    result: categories,
                });
            });
    });
};

module.exports = route;
