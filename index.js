const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/users", { useNewUrlParser: true })
  .then(result => console.log("Connected Successfully"))
  .catch(err => console.log("Connection Failed", err));

app.use(express.json());
app.use(cors());
require("./models");
app.use(require("./routes"));

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => console.log(`Running on PORT : ${PORT}`));
