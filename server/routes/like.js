const route = (app, collection) => {
    app.put("/api/like", (request, response) => {
        const title = request.body.title;
        const liked = request.body.liked;

        if (!title) {
            response.status(400);

            return response.json({
                message: "Expected parameter title",
            });
        }
        collection.find({ title }).toArray((err, arr) => {
            arr.forEach(item => {
                collection.updateOne(
                    { _id: item._id },
                    {
                        $set: {
                            like: liked,
                        },
                    },
                );
            });

            return response.json({
                message: "Item updated",
            });
        });
    });
};

module.exports = route;
