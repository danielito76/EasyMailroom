const { MongoClient, ObjectID } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const client = new MongoClient(
    'mongodb+srv://Daniele-Nocito:5skfWZUcYcs9d9CI@clustereasymailroom.7c56v.mongodb.net/food?retryWrites=true&w=majority',
    { useUnifiedTopology: true }
);

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

var collection;

server.get('/search', async (req, res) => {
    try {
        let result = await collection
            .aggregate([
                {
                    $search: {
                        autocomplete: {
                            query: req.query.query,
                            path: 'name',
                            fuzzy: {
                                maxEdits: 2,
                            },
                        },
                    },
                },
            ])
            .toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

server.get('/get/:id', async (req, res) => {
    try {
//      Mistake corrected:
//      let result = await collection.findOne({ _id: ObjectID(req.params.id) });
        let result = await collection.findOne({ _id: req.params.id });
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

server.listen(3000, async () => {
    try {
        await client.connect();
        collection = client.db('food').collection('recipes');
        console.log('Listening on port 3000');
    } catch (error) {
        console.error(error);
    }
});
