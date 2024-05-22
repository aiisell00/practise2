const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express()
const port = 8080
const DB_URL="mongodb+srv://aysel:aysel123@cluster0.gxkwlhi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const Schema = mongoose.Schema;

const WatchSchema = new Schema(
  {
    title: { type: String, require: true },
    price: { type: Number, require: true },
    imageUrl: { type: String, require: true },
    description: { type: String, require: true },
  },
  { timestamps: true }
);

const WatchModel = mongoose.model("Watch", WatchSchema);
app.get("/api/watchs", async (req, res) => {
  try {
    const watches = await WatchModel.find({});

    if (watches.length > 0) {
      res.status(200).send({ message: "success", data: watches });
    } else {
      res.status(204).send({
        message: "data is empty",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/api/watchs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const watch = await WatchModel.findById(id);
    
    if (watch) {
      res.status(200).send({
        message: "success",
        data: watch,
      });
    } else {
      res.status(404).send({ message: "data not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.delete("/api/watchs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedWatch = await WatchModel.findByIdAndDelete(id);
    const watches = await WatchModel.find({});

    res.status(200).send({
      message: "deleted successfully",
      deletedProduct: deletedWatch,
      allWatches: watches,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.post("/api/watchs", async (req, res) => {
  try {
    const newWatch = new WatchModel({ ...req.body });
    await newWatch.save();
    const watches = await WatchModel.find({});

    res.status(201).send({
      message: "created succesfully",
      data: newWatch,
      allWatches: watches,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
app.patch("/api/watchs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await WatchModel.findByIdAndUpdate(id, { ...req.body });
    const updatedWatch = await WatchModel.findById(id);
    res.send({
      message: "updated succesfully!",
      updatedWatch: updatedWatch,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
mongoose.connect(DB_URL)
  .then(() => {
      console.log('Connected!')
    app.listen(port, () => {
        console.log(`Link: http://localhost: ${port}`)
      })
});