const route = (app, data) => {
    app.get("/api/top10", (request, response) => {
        const { query } = request;
        const { category } = query;
        const result = data
            .sort((a, b) => b[category] - a[category])
            .slice(0, 10);

        response.json({
            status: 200,
            result,
        });
    });
};

module.exports = route;
