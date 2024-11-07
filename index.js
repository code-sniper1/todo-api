var Express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());

var CONNECTION_STRING = "mongodb+srv://amit:amit1234@cluster0.fdrem2x.mongodb.net/?retryWrites=true&w=majority";
var DATABASE_NAME = "Todoappdb";
var database;

app.listen(5038, () => {
    MongoClient.connect(CONNECTION_STRING, (error, client) => {
        database = client.db(DATABASE_NAME);
        console.log("Connected successfully");
    });
});

app.get('/api/todoapp/GetNotes', (request, response) => {
    database.collection("todoappcollection").find({}).toArray((error, result) => {
        if (error) {
            console.error("Error fetching notes:", error);
            response.status(500).send("Internal Server Error");
            return;
        }
        
        console.log("Result:", result);
        response.json(result);
    });
});
/*

app.post('/api/todoapp/AddNotes', multer().none(), (request, response) => {
    database.collection("todoappcollection").count({}, function (error, numofDocs) {
        database.collection("todoappcollection").insertOne({
            id: (numofDocs + 1).toString(),
            description: request.body.newNotes
        }, function (err, res) {
            if (err) throw err;
            response.json("Added Successfully");
        });
    });
});

app.delete('/api/todoapp/DeleteNotes', (request, response) => {
    database.collection("todoappcollection").deleteOne({
        id: request.query.id
    }, function (err, obj) {
        if (err) throw err;
        response.json("Deleted successfully");
    });
});
*/