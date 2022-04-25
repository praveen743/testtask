const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jswt = require("jsonwebtoken");
const secret = "AkYeHoPkd";
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const URL = "mongodb+srv://praveen7:prmdb7@cluster0.n3p9l.mongodb.net/retryWrites=true&w=majority";


app.use(express.json())
app.use(cors({
    origin: "*"
}))

// problem 5

app.post("/additem", async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db("Aroopa")
        await db.collection("InventoryList").insertOne(req.body)
         await connection.close();
        res.json({ message: "item Added" })
    } catch (error) {
        console.log(error)
    }
});

app.get("/getarr", async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db("Aroopa");
        let arr = await db.collection("InventoryList").find({}).toArray();
        await connection.close();
        res.json(arr);
    } catch (error) {
        console.log(error)
    }
});

app.delete("/delitem/:id", async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db("Aroopa");
         console.log(req.params.id)
        var deldata = await db.collection("InventoryList").deleteMany({ items: req.params.id})
        await connection.close();
        res.json({ message: "item Deleted" })
    } catch (error) {
        console.log(error)
    }
});

// problem 1
app.post("/addtitle", async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db("Aroopa");
        let arr = await db.collection("problem1").find({}).toArray();
        console.log(arr.length);
        var len = arr.length+1;
         if(arr.length==0){
            req.body.id = 1;
            await db.collection("problem1").insertOne(req.body)
        }else{
            req.body.id = len;
            await db.collection("problem1").insertOne(req.body)
            await connection.close();
           res.json({ message: "Title Added" })
        }
       
    } catch (error) {
        console.log(error)
    }
});

app.get("/gettaskarr", async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db("Aroopa");
        let arr = await db.collection("problem1").find({}).toArray();
        await connection.close();
        res.json(arr);
    } catch (error) {
        console.log(error)
    }
});

app.put("/addtitle/:id", async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db("Aroopa");
        // let objId = mongodb.ObjectId(req.params.id)
        console.log(req.body.stage)
        console.log(parseInt(req.params.id) )

        var updatedarr = await db.collection("problem1").updateOne({ id: parseInt(req.params.id) }, { $set: {stage:req.body.stage} })
        console.log(updatedarr);
        await connection.close();
        res.json({ message: "User Updated" })
    } catch (error) {
        res.json(error);
        console.log(error)
    }
});

app.listen(3001,console.log("App is running"))
