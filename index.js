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
        const ordersCollection = db.collection("ordersCollection");
        const usersCollection = db.collection("usersCollection");
        const reviewsCollection = db.collection("reviewsCollection");
        const blogsCollection = db.collection("blogsCollection");
        const adminsCollection = db.collection("adminsCollection");
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
  ////API to get all orders
  app.get("/orders", async (req, res) => {
    const orders = await ordersCollection.find({}).toArray();
    res.send(orders);
  });

  //API to update a order
  app.put("/orders/:id", async (req, res) => {
    const orderId = req.params.id;
    const order = req.body;
    console.log("order", order);
    const query = { _id: ObjectId(orderId) };
    const options = { upsert: true };
    const updatedOrder = await ordersCollection.updateOne(
      query,
      {
        $set: order,
      },
      options
    );
    res.send(updatedOrder);
  });

  //API to get orders by user email
  app.get("/orders/:email", async (req, res) => {
    const email = req.params.email;
    const orders = await ordersCollection
      .find({ userEmail: email })
      .toArray();
    res.send(orders);
  });
  //API to get orders with multiple query parameters
  app.get("/orders/:email/:isdelivered", async (req, res) => {
    const email = req.params.email;
    const isdelivered = req.params.isdelivered;
    const orders = await ordersCollection
      .find({ userEmail: email, isDelivered: true })
      .toArray();
    res.send(orders);
  });

  //API to add a order
  app.post("/orders", async (req, res) => {
    const order = req.body;
    const result = await ordersCollection.insertOne(order);
    res.send(result);
  });

  //API to delete a order
  app.delete("/orders/:id", async (req, res) => {
    const id = req.params.id;
    console.log("id", id);
    const result = await ordersCollection.deleteOne({ _id: ObjectId(id) });
    res.send(result);
  });

    }
    
    finally{

    }
}

run().catch(console.dir);

app.listen(port, () => console.log(`Listening on port ${port}`));