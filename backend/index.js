const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
// const cookieparser = require("cookie-parser");
const cors = require("cors");
const userroute = require("./routes/ruser");
const algorithmsroute = require("./routes/ralgorithms");
const searchroute = require("./routes/rsearch.js");
const userdoroute = require("./routes/ruserdo.js");
const checkAuth = require("./middleware/checkAuth.js");

const port = process.env.PORT || 9000;

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to mongodb");
}).catch((err) => {
  console.log(`${err} \n error connecting mongoDB `);
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }))
// app.use(cookieparser());


app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "authorization"],
  credentials: true,
}));


app.use(checkAuth);

app.use("/api/user", userroute);

app.use("/api/algorithms", algorithmsroute);

app.use("/api/search", searchroute);

app.use("/api/userdo", userdoroute);


app.listen(port, () => {
  console.log(`listening at port : ${port}`);
});

