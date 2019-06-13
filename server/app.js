require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const errHandler = require("./helpers/errHandler");
const cors = require("cors")

app.use(cors())
app.use(morgan('short'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const routes = require("./routes");

app.get("/", function(req, res) {
  res.send("connect");
});

app.use("/", routes);
app.use(errHandler);

app.listen(port, function() {
  console.log("listening to port", port);
});

mongoose
  .connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`, {
    useNewUrlParser: true
  })
  .then(onfullfilled => {
    console.log("berhasil connect mongodb");
  })
  .catch(onrejected => {
    console.log("gagal connect mongodb");
    console.log(JSON.stringify(onrejected, null, 2));
  });