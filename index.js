const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.x10dc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () =>{
    try{
        await client.connect();
        console.log("Connected to MongoDB");
        const db = client.db("toolsDB");
        const toolsCollection = db.collection("toolsCollection");

            //API to get all tools
    app.get("/tools", async (req, res) => {
        const tools = await toolsCollection.find({}).toArray();
        res.send(tools);
      });
  
      //API to get single tools
      app.get("/tools/:id", async (req, res) => {
        const id = req.params.id;
        const tool = await toolsCollection.findOne({ _id: ObjectId(id) });
        res.send(tool);
      });
    }
    finally{

    }
}

run().catch(console.dir);

app.listen(port, () => console.log(`Listening on port ${port}`));