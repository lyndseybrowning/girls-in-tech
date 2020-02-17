const shared = require("../shared");
const categories = require("../../categories");

const route = (app, collection) => {
    app.get("/api/all/:categoryId?", (request, response) => {
        const categoryId = request.params.categoryId;
        let match = {};
        let selectedCategory = "All";

        if (categoryId) {
            match = {
                categoryId: Number(categoryId),
            };
            selectedCategory = categories.items.find(c => c.id === categoryId)
                .snippet.title;
        }

        collection
            .aggregate([
                { $group: shared.$group },
                { $match: match },
                { $sort: { title: -1 } },
            ])
            .toArray((err, result) => {
                if (err) {
                    response.status(500);
                }

                response.json({
                    totalRecords: result.length,
                    category: selectedCategory,
                    result,
                });
            });
    });
};

module.exports = route;
