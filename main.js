// copied from Altlas MongoDB example
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Daniele-Nocito:5skfWZUcYcs9d9CI@clustereasymailroom.7c56v.mongodb.net/food?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//==================================================================
// copied from Altlas MongoDB tutorial
//const { MongoClient, ObjectID } = require("mongodb");
const Express = require("express");
const Cors = require("cors");
const BodyParser = require("body-parser");
const { request } = require("express");
//const client = new MongoClient(process.env["ATLAS_URI"]);
const server = Express();
server.use(BodyParser.json());
server.use(BodyParser.urlencoded({ extended: true }));
server.use(Cors());
let collection;
server.get('/search', async (request, response) => {
    try {
        let result = await collection.aggregate([
            {
                "$search": {
                    "autocomplete": {
                        "query": `${request.query.query}`,
                        "path": "name",
                        "fuzzy": {
                            "maxEdits": 2,
                            "prefixLength": 3
                        }
                    }
                }
            }
        ]).toArray();
        response.send(result);
    } catch (e) {
        response.status(500).send({ message: e.message });
    }
});
server.get('/get/:id', async (request, response) => {
    try {
        let result = await collection.findOne({ "_id": ObjectID(request.params.id) });
        response.send(result);
    } catch (e) {
        response.status(500).send({ message: e.message });
    }
});
server.listen("3000", async () => {
    try {
        await client.connect();
        collection = client.db("food").collection("recipes");
    } catch (e) {
        console.error(e);
    }
});
