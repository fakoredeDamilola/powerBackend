const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const mongoose = require("mongoose");

const app = express();
dotenv.config();
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/", userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Sever started on port ${PORT}`));
