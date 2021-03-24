const express = require("express");
const mongoose = require("mongoose");

const router = require("./routes/router");

const { connectionUrl } = require("./config");

const PORT = 5000;

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
  next();
});

app.use(express.json());

app.use("/api", router);

app.use((req, res) => {
  res.json({ result: "invalid endpoint" });
});

mongoose
  .connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to the database established successfully! :)");
    app.listen(PORT, () => {
      console.log("server started at port " + PORT);
    });
  })
  .catch((err) => {
    console.log("Couldn't connect to the database! :(");
    console.log(err.message);
  });
