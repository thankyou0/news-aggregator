const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
// const cookieparser = require("cookie-parser");
const cors = require("cors");
const checkAuth = require("./middleware/checkAuth.js");
const userroute = require("./routes/ruser");
const algorithmsroute = require("./routes/ralgorithms");
const searchroute = require("./routes/rsearch.js");
const userdoroute = require("./routes/ruserdo.js");
const feedroute = require("./routes/rfeed.js");
const quicksearchroute = require("./routes/rquicksearch.js");
const sendemailroute = require("./routes/rsendemail.js");
const changepasswordroute = require("./routes/rchangepassword.js");
const providerroute = require("./routes/rprovider.js");
const quiz_router = require("./routes/rquiz.js");
const path = require('path');
const port = process.env.PORT || 9000;

// Serve static files from the React app

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
// });

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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});




app.use("/api/user", userroute);

app.use("/api/algorithms", algorithmsroute);

app.use("/api/search", checkAuth, searchroute);

app.use("/api/userdo", checkAuth, userdoroute);

app.use("/api/myfeed", checkAuth, feedroute);

app.use("/api/quicksearch", checkAuth, quicksearchroute);

app.use("/api/sendemail", sendemailroute);

app.use("/api/changepassword", checkAuth, changepasswordroute);

app.use("/api/provider", providerroute);

app.use("/api/quiz",quiz_router);

app.listen(port, () => {
  console.log(`listening at port : ${port}`);
});

