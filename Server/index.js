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

const courseSchema = new Schema(
  {
    title: { type: String, require: true },
    price: { type: Number, require: true },
    imageUrl: { type: String, require: true },
    description: { type: String, require: true },
  },
  { timestamps: true }
);

const CourseModel = mongoose.model("Course", courseSchema);
app.get("/api/course", async (req, res) => {
  try {
    const course = await CourseModel.find({});

    if (course.length > 0) {
      res.status(200).send({ message: "success", data: course });
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

app.get("/api/course/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const course = await CourseModel.findById(id);
    
    if (watch) {
      res.status(200).send({
        message: "success",
        data: course,
      });
    } else {
      res.status(404).send({ message: "data not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.delete("/api/course/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCourse = await CourseModel.findByIdAndDelete(id);
    const course = await CourseModel.find({});

    res.status(200).send({
      message: "deleted successfully",
      deletedCourse: deletedCourse,
      allCourse: course,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.post("/api/course", async (req, res) => {
  try {
    const newCourse = new CourseModel({ ...req.body });
    await newCourse.save();
    const course = await CourseModel.find({});

    res.status(201).send({
      message: "created succesfully",
      data: newCourse,
      allCourse: course,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
app.patch("/api/course/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await CourseModel.findByIdAndUpdate(id, { ...req.body });
    const updatedCourse = await CourseModel.findById(id);
    res.send({
      message: "updated succesfully!",
      updatedCourse: updatedCourse,
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