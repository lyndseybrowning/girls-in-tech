const { MongoClient } = require("mongodb");

async function main(callback) {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri =
        "mongodb+srv://user:d3z1oEaK6Mmgsy9P@girlsintech-brihq.mongodb.net/test?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
        // connect to the MongoDB cluster
        await client.connect();

        return callback(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

module.exports = main;
