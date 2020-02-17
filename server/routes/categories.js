const cats = require("../../categories.json");

const route = (app, collection) => {
    const $group = {
        _id: "$category_id",
        categoryId: { $first: "$category_id" },
        videos: { $sum: 1 },
    };

    app.get("/api/categories", (request, response) => {
        collection
            .aggregate([
                { $group },
                { $match: {} },
                { $sort: { categoryId: 1 } },
            ])
            .toArray((err, result) => {
                if (err) {
                    return response.status(500);
                }

                const categories = result
                    .map(({ categoryId, videos }) => {
                        const category = cats.items.find(
                            item => item.id == categoryId,
                        );

                        if (!category) return null;

                        return {
                            categoryId,
                            category: category.snippet.title,
                            videos,
                        };
                    })
                    .filter(Boolean);

                response.json({
                    result: categories,
                });
            });
    });
};

module.exports = route;
