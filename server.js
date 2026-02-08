const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://SachinMONGOdev:BwtVxm9PgtNGkhL@cluster0-shard-00-00.ysqos53.mongodb.net:27017,cluster0-shard-00-01.ysqos53.mongodb.net:27017,cluster0-shard-00-02.ysqos53.mongodb.net:27017/?ssl=true&replicaSet=atlas-xxxx-shard-0&authSource=admin&retryWrites=true&w=majority");

const ResponseSchema = new mongoose.Schema({
  answer: String,
  time: String,
  userAgent: String,
});

const Response = mongoose.model("Response", ResponseSchema);

app.get("/yes", (req, res) => {
  res.send("YES route is working 🚀");
});

app.post("/yes", async (req, res) => {
  const newResponse = new Response({
    answer: "Yes",
    time: new Date().toString(),
    userAgent: req.headers["user-agent"],
  });

  await newResponse.save();
  res.send({ status: "saved" });
});

app.listen(3000, () => console.log("Server running"));
