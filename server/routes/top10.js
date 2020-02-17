const shared = require("../shared");

const route = (app, collection) => {
    app.get("/api/top10", (request, response) => {
        const { query } = request;
        const { category } = query;

        collection
            .aggregate([
                { $group: shared.$group },
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
