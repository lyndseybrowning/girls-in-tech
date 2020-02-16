const { MongoClient } = require("mongodb");

async function main(callback) {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = process.env.MONGODB_URL;

    try {
        MongoClient.connect(uri, { useUnifiedTopology: true }, (err, db) => {
            if (err) console.log(err);

            const dbo = db.db("datasets");
            const collection = dbo.collection("youtube-gb");

            return callback(collection);
        });
    } catch (e) {
        console.error(e);
    }
}

module.exports = main;
