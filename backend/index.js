const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
const task = require('./routes/task')
dotenv.config()
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong!");
});

app.use("/api/task", task);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
